
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import AnnouncementBar from './components/AnnouncementBar';
import ProductCard from './components/ProductCard';
import ProductDetails from './components/ProductDetails';
import ArticleDetails from './components/ArticleDetails';
import AiAssistant from './components/AiAssistant';
import BlogSection from './components/BlogSection';
import SafetyArticles from './components/SafetyArticles';
import FeaturedBanner from './components/FeaturedBanner';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';
import SEO from './components/SEO';
import { PRODUCTS, ARTICLES } from './constants';
import { Product, ViewType, Article, Language } from './types';
import { Shield, ChevronLeft, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('fd_lang');
    return (saved === 'de' || saved === 'en') ? saved : 'en';
  });
  
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [legalType, setLegalType] = useState<'imprint' | 'privacy' | 'terms' | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const websiteSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "FireDetectors.de",
    "url": window.location.origin,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${window.location.origin}/#/products?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  }), []);

  const categories = useMemo(() => {
    if (lang === 'de') return ['Alle', 'Rauchmelder', 'Hitzemelder', 'Gasmelder', 'Sets', 'Zubehör'];
    return ['All', 'Smoke Detector', 'Heat Detector', 'Gas Detector', 'Sets', 'Accessories'];
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('fd_lang', lang);
  }, [lang]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#/';
      if (hash === '#/' || hash === '') {
        setCurrentView('home');
      } else if (hash === '#/produkte' || hash === '#/products') {
        setCurrentView('products');
      } else if (hash === '#/brandschutz-blog' || hash === '#/blog') {
        setCurrentView('blog');
      } else if (hash.startsWith('#/rauchmelder-vergleich/')) {
        const slug = hash.replace('#/rauchmelder-vergleich/', '');
        const product = PRODUCTS.find(p => p.slug === slug);
        if (product) {
          setSelectedProduct(product);
          setCurrentView('product-details');
        }
      } else if (hash.startsWith('#/brandschutz-ratgeber/')) {
        const slug = hash.replace('#/brandschutz-ratgeber/', '');
        const article = ARTICLES.find(a => a.slug === slug);
        if (article) {
          setSelectedArticle(article);
          setCurrentView('article-details');
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [lang]);

  const navigateTo = (view: ViewType, slugOrId?: string) => {
    if (view === 'home') window.location.hash = '#/';
    else if (view === 'products') window.location.hash = lang === 'en' ? '#/products' : '#/produkte';
    else if (view === 'blog') window.location.hash = lang === 'en' ? '#/blog' : '#/brandschutz-blog';
    else if (view === 'product-details' && slugOrId) {
      const p = PRODUCTS.find(p => p.id === slugOrId || p.slug === slugOrId);
      window.location.hash = `#/rauchmelder-vergleich/${p?.slug || slugOrId}`;
    }
    else if (view === 'article-details' && slugOrId) {
      const a = ARTICLES.find(a => a.id === slugOrId || a.slug === slugOrId);
      window.location.hash = `#/brandschutz-ratgeber/${a?.slug || slugOrId}`;
    }
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const nameMatch = p.name[lang].toLowerCase().includes(searchQuery.toLowerCase());
      const catKey = (selectedCategory === 'All' || selectedCategory === 'Alle') ? 'All' : selectedCategory;
      const matchesCategory = catKey === 'All' || p.category === catKey;
      return nameMatch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, lang]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    return (
      <div className="flex items-center justify-center gap-2 mt-16 mb-8">
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className={`p-3 rounded-xl border border-slate-200 transition-all ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-100 hover:text-red-600'}`}>
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button key={page} onClick={() => handlePageChange(page)} className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${currentPage === page ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10' : 'text-slate-500 hover:bg-slate-100'}`}>
              {page}
            </button>
          ))}
        </div>
        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} className={`p-3 rounded-xl border border-slate-200 transition-all ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-100 hover:text-red-600'}`}>
          <ChevronRight size={20} />
        </button>
      </div>
    );
  };

  const renderProductList = (products: Product[]) => {
    const featuredProduct = PRODUCTS.find(p => p.id === 'aj-ultimate-10') || PRODUCTS[0];
    const elements = [];
    
    products.forEach((p, idx) => {
      elements.push(<ProductCard key={p.id} lang={lang} product={p} onViewDetails={(p) => navigateTo('product-details', p.slug)} />);
      
      // Inject internal featured banner after 4 products
      if (idx === 3 && products.length > 4) {
        elements.push(<FeaturedBanner key="grid-featured" lang={lang} product={featuredProduct} onView={(p) => navigateTo('product-details', p.slug)} />);
      }
    });
    
    return elements;
  };

  const renderContent = () => {
    const t = {
      heroTitle: lang === 'en' ? "Professional Fire Protection" : "Professioneller Brandschutz",
      heroSub: lang === 'en' ? "Made Easy." : "Einfach gemacht.",
      heroDesc: lang === 'en' ? "Independent reviews of VdS certified Rauchmelder for your home safety." : "Unabhängige Reviews von VdS zertifizierten Rauchmeldern für Ihre Sicherheit zu Hause.",
      shopBtn: lang === 'en' ? "Browse Catalog" : "Katalog ansehen",
      blogBtn: lang === 'en' ? "Safety Knowledge Hub" : "Brandschutz-Wissen",
      topRated: lang === 'en' ? "Top-Rated Alarms" : "Top-bewertete Melder",
      blogHero: lang === 'en' ? "Expert Knowledge" : "Experten-Wissen",
      blogDesc: lang === 'en' ? "Technical deep dives." : "Technische Analysen."
    };

    switch (currentView) {
      case 'blog':
        return (
          <div className="bg-slate-50">
            <header className="bg-slate-900 py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl md:text-6xl font-black text-white mb-6">{t.blogHero}</h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">{t.blogDesc}</p>
              </div>
            </header>
            <SafetyArticles lang={lang} onViewArticle={(art) => navigateTo('article-details', art.slug)} />
            <BlogSection lang={lang} onNavigate={navigateTo} />
          </div>
        );
      case 'article-details':
        return selectedArticle ? <ArticleDetails article={selectedArticle} onBack={() => navigateTo('blog')} lang={lang} onNavigate={navigateTo} /> : null;
      case 'product-details':
        return selectedProduct ? <ProductDetails product={selectedProduct} onBack={() => navigateTo('products')} onNavigate={navigateTo} lang={lang} /> : null;
      case 'products':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <header className="mb-12">
              <h1 className="text-3xl font-bold text-slate-900 mb-6">{lang === 'en' ? 'Detector Catalog' : 'Melder-Katalog'}</h1>
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {categories.map(cat => (
                  <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {renderProductList(paginatedProducts)}
            </div>
            {renderPagination()}
          </div>
        );
      case 'home':
      default:
        return (
          <>
            <section className="bg-slate-900 py-24 overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest mb-6">
                      <Shield size={14} /> {lang === 'en' ? 'DIN EN 14604 & VdS Verified' : 'DIN EN 14604 & VdS Geprüft'}
                    </div>
                    <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                      {t.heroTitle} <br/><span className="text-red-500">{t.heroSub}</span>
                    </h1>
                    <p className="text-lg text-slate-400 mb-10 max-w-xl leading-relaxed">{t.heroDesc}</p>
                    <div className="flex flex-wrap gap-4">
                      <button onClick={() => navigateTo('products')} className="bg-red-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-600/20">{t.shopBtn}</button>
                      <button onClick={() => navigateTo('blog')} className="bg-slate-800 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-700 transition-all">{t.blogBtn}</button>
                    </div>
                  </div>
                  <div className="relative hidden lg:block">
                    <div className="absolute -inset-10 bg-red-600/20 blur-[100px] rounded-full"></div>
                    <img 
                      src={PRODUCTS.find(p => p.id === 'hekatron-premium')?.imageUrl || PRODUCTS[0].imageUrl} 
                      alt="Premium Fire Safety" 
                      className="relative w-full max-w-md mx-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] animate-float p-8"
                    />
                  </div>
                </div>
              </div>
            </section>
            
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-bold text-slate-900">{t.topRated}</h2>
                <div className="hidden sm:flex gap-2">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase rounded-full tracking-wider border border-emerald-200">
                    {lang === 'en' ? "In Stock" : "Auf Lager"}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {PRODUCTS.slice(0, 8).map(product => <ProductCard key={product.id} lang={lang} product={product} onViewDetails={(p) => navigateTo('product-details', p.slug)} />)}
              </div>
            </section>

            <div className="bg-slate-50 py-16 border-y border-slate-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FeaturedBanner 
                   lang={lang} 
                   product={PRODUCTS.find(p => p.id === 'hekatron-premium') || PRODUCTS[0]} 
                   onView={(p) => navigateTo('product-details', p.slug)} 
                />
              </div>
            </div>

            <SafetyArticles lang={lang} onViewArticle={(art) => navigateTo('article-details', art.slug)} />
            <BlogSection lang={lang} onNavigate={navigateTo} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO schema={websiteSchema} />
      <AnnouncementBar lang={lang} onNavigate={navigateTo} />
      <Header lang={lang} onLangChange={setLang} onSearch={setSearchQuery} onNavigate={navigateTo} />
      <main className="flex-1">{renderContent()}</main>
      <Footer lang={lang} onOpenLegal={setLegalType} onNavigate={navigateTo} />
      <AiAssistant lang={lang} />
      <LegalModal lang={lang} isOpen={!!legalType} type={legalType || 'imprint'} onClose={() => setLegalType(null)} />
    </div>
  );
};

export default App;
