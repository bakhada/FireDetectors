
import React, { useState, useMemo } from 'react';
import { ArrowLeft, ExternalLink, ShieldCheck, Zap, Info, Package, Share2, Twitter, MessageCircle, Link as LinkIcon, Check, ChevronRight, BookOpenText } from 'lucide-react';
import { Product, ViewType, Language } from '../types';
import { PRODUCTS, ARTICLES } from '../constants';
import SEO from './SEO';

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
  onNavigate: (view: ViewType, slugOrId?: string) => void;
  lang: Language;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onBack, onNavigate, lang }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}${window.location.pathname}#/rauchmelder-vergleich/${product.slug}`;
  const shareText = lang === 'en' 
    ? `Check out this ${product.name[lang]} on FireDetectors.de - Verified Safety Recommendation.`
    : `Sieh dir diesen ${product.name[lang]} auf FireDetectors.de an - Geprüfte Sicherheitsempfehlung.`;

  const relatedProducts = useMemo(() => {
    return PRODUCTS
      .filter(p => p.id !== product.id && p.category === product.category)
      .slice(0, 3);
  }, [product]);

  const relatedArticles = useMemo(() => {
    const mapping: Record<string, string[]> = {
      'Smoke Detector': ['legal-faq', 'mount-guide', 'maintenance-guide'],
      'Heat Detector': ['kitchen-safety', 'legal-faq', 'maintenance-guide'],
      'Sets': ['smart-home-integration', 'legal-faq', 'mount-guide'],
      'Gas Detector': ['legal-faq', 'maintenance-guide', 'battery-tech'],
      'Accessories': ['mount-guide', 'maintenance-guide', 'legal-faq'],
    };

    const preferredIds = mapping[product.category] || ['legal-faq', 'mount-guide', 'battery-tech'];
    return ARTICLES.filter(a => preferredIds.includes(a.id)).slice(0, 3);
  }, [product.category]);

  const productSchema = useMemo(() => ({
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name[lang],
    "image": [product.imageUrl],
    "description": product.description[lang],
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": "FireDetectors.de Recommended"
    },
    "offers": {
      "@type": "Offer",
      "url": shareUrl,
      "priceCurrency": "EUR",
      "price": product.priceNumeric,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Amazon"
      }
    }
  }), [product, lang, shareUrl]);

  const breadcrumbSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": lang === 'en' ? "Home" : "Startseite",
        "item": `${window.location.origin}/#/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": lang === 'en' ? "Catalog" : "Katalog",
        "item": `${window.location.origin}/#/products`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.category,
        "item": `${window.location.origin}/#/products`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": product.name[lang],
        "item": shareUrl
      }
    ]
  }), [product, lang, shareUrl]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name[lang],
        text: shareText,
        url: shareUrl,
      });
    }
  };

  const t = {
    expertAnalysis: lang === 'en' ? 'Expert Safety Analysis' : 'Experten-Analyse',
    techSpecs: lang === 'en' ? 'Technical Specifications' : 'Technische Daten',
    return: lang === 'en' ? 'Return to Catalog' : 'Zurück zum Katalog',
    helpOthers: lang === 'en' ? 'Help others stay safe:' : 'Anderen helfen, sicher zu bleiben:',
    retailPartner: lang === 'en' ? 'Official Retail Partner' : 'Offizieller Handelspartner',
    amazonGuarantee: lang === 'en' ? 'Fast Shipping & Amazon Guarantee' : 'Schneller Versand & Amazon-Garantie',
    shopAmazon: lang === 'en' ? 'Buy Now' : 'Jetzt kaufen',
    independent: lang === 'en' ? 'FireDetectors.de is an independent safety review platform. We earn from qualifying purchases on Amazon.' : 'FireDetectors.de ist eine unabhängige Plattform für Sicherheitsbewertungen. Wir verdienen an qualifizierten Käufen über Amazon.',
    related: lang === 'en' ? `Related ${product.category} Protection Gear` : `Ähnliche ${product.category}-Sicherheitsprodukte`,
    home: lang === 'en' ? 'Home' : 'Startseite',
    catalog: lang === 'en' ? 'Catalog' : 'Katalog',
    alarms: lang === 'en' ? 'Alarms' : 'Melder',
    relatedGuides: lang === 'en' ? 'Recommended Expert Guides' : 'Passende Experten-Ratgeber',
    learnMore: lang === 'en' ? 'Read Guide' : 'Ratgeber lesen'
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" itemScope itemType="https://schema.org/Product">
      <SEO schema={productSchema} />
      <SEO schema={breadcrumbSchema} />
      
      <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-8 overflow-x-auto no-scrollbar whitespace-nowrap" aria-label="Breadcrumb">
        <button onClick={() => onNavigate('home')} className="hover:text-red-600 transition-colors">{t.home}</button>
        <ChevronRight size={12} />
        <button onClick={() => onNavigate('products')} className="hover:text-red-600 transition-colors">{t.catalog}</button>
        <ChevronRight size={12} />
        <span className="text-slate-900">{product.category} {t.alarms}</span>
        <ChevronRight size={12} />
        <span className="text-slate-300 truncate" itemProp="name">{product.name[lang]}</span>
      </nav>

      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-semibold mb-8 transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        {t.return}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 flex items-center justify-center shadow-sm h-fit">
          <img src={product.imageUrl} alt={product.name[lang]} className="max-h-[500px] w-full object-contain" itemProp="image" />
        </div>

        <div className="flex flex-col">
          <header className="mb-6">
            <span className="inline-block bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
              Verified {product.category} Safety Gear
            </span>
            <div className="flex justify-between items-start gap-4">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4" itemProp="name">{product.name[lang]}</h1>
              <button onClick={handleNativeShare} className="lg:hidden p-2 text-slate-400 hover:text-red-600 transition-colors">
                <Share2 size={24} />
              </button>
            </div>
            <div className="flex items-center gap-4 mb-6" itemProp="offers" itemScope itemType="https://schema.org/Offer">
              <span className="text-4xl font-bold text-slate-900" itemProp="price" content={product.priceNumeric.toString()}>{product.price}</span>
              <meta itemProp="priceCurrency" content="EUR" />
              <link itemProp="availability" href="https://schema.org/InStock" />
            </div>
          </header>

          <article className="prose prose-slate mb-8">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <Info size={18} className="text-red-600" /> 
              {t.expertAnalysis}
            </h2>
            <p className="text-slate-600 leading-relaxed" itemProp="description">{product.description[lang]}</p>
          </article>

          {product.specs && (
            <div className="mb-8">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Zap size={16} className="text-red-600" />
                {t.techSpecs}
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.specs.map((spec, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <ShieldCheck size={16} className="text-emerald-500" />
                    {spec[lang]}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-auto space-y-4">
            <div className="flex flex-wrap items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">{t.helpOthers}</span>
              <div className="flex items-center gap-2">
                <a href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-all"><MessageCircle size={18} /></a>
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-sky-50 text-sky-600 rounded-lg hover:bg-sky-600 hover:text-white transition-all"><Twitter size={18} /></a>
                <button onClick={handleCopyLink} className={`p-2 rounded-lg transition-all flex items-center gap-2 text-xs font-bold ${copied ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                  {copied ? <Check size={16} /> : <LinkIcon size={16} />} {copied ? (lang === 'en' ? 'Link Copied!' : 'Kopiert!') : (lang === 'en' ? 'Copy Safety Link' : 'Link kopieren')}
                </button>
              </div>
            </div>

            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-white p-3 rounded-2xl shadow-sm">
                  <Package size={24} className="text-slate-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{t.retailPartner}</p>
                  <p className="text-xs text-slate-500">{t.amazonGuarantee}</p>
                </div>
              </div>
              <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-red-600 text-white rounded-2xl font-bold text-lg hover:bg-red-700 transition-all shadow-xl shadow-red-600/20">
                {t.shopAmazon} <ExternalLink size={20} />
              </a>
              <p className="text-[10px] text-slate-400 text-center mt-4 italic">
                {t.independent}
              </p>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="border-t border-slate-200 pt-16 mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">{t.related}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map(rp => (
              <div key={rp.id} onClick={() => onNavigate('product-details', rp.slug)} className="group bg-white border border-slate-200 rounded-2xl p-4 cursor-pointer hover:shadow-lg transition-all">
                <div className="aspect-square bg-slate-50 rounded-xl p-4 mb-4 overflow-hidden"><img src={rp.imageUrl} alt={rp.name[lang]} className="w-full h-full object-contain group-hover:scale-105 transition-transform" /></div>
                <h3 className="text-sm font-bold text-slate-900 line-clamp-2 mb-2 group-hover:text-red-600 transition-colors">{rp.name[lang]}</h3>
                <p className="text-red-600 font-bold">{rp.price}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {relatedArticles.length > 0 && (
        <section className="border-t border-slate-200 pt-16">
          <div className="flex items-center gap-2 text-red-600 font-bold text-sm uppercase tracking-widest mb-4">
            <BookOpenText size={20} />
            {t.relatedGuides}
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            {lang === 'en' ? `Learn more about ${product.category} Safety` : `Mehr über ${product.category}-Sicherheit erfahren`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map(art => (
              <div 
                key={art.id} 
                onClick={() => onNavigate('article-details', art.slug)} 
                className="group cursor-pointer bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 hover:shadow-md transition-all flex flex-col h-full"
              >
                <div className="aspect-video overflow-hidden">
                  <img src={art.imageUrl} alt={art.title[lang]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                   <h3 className="font-bold text-slate-900 line-clamp-2 mb-3 group-hover:text-red-600 transition-colors">
                     {art.title[lang]}
                   </h3>
                   <p className="text-xs text-slate-500 line-clamp-2 mb-4 flex-1 leading-relaxed">
                     {art.summary[lang]}
                   </p>
                   <span className="text-red-600 text-[10px] font-black uppercase flex items-center gap-1 mt-auto group-hover:gap-2 transition-all">
                     {t.learnMore} <ChevronRight size={12} />
                   </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </section>
  );
};

export default ProductDetails;
