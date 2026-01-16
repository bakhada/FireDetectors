
import React from 'react';
import { Product, Comparison, Language, ViewType } from '../types';
import { PRODUCTS } from '../constants';
import { Scale, CheckCircle2, ExternalLink, Eye } from 'lucide-react';

interface BlogSectionProps {
  lang: Language;
  onNavigate: (view: ViewType, slugOrId?: string) => void;
}

const BlogSection: React.FC<BlogSectionProps> = ({ lang, onNavigate }) => {
  const getProduct = (id: string) => PRODUCTS.find(p => p.id === id);

  const comparisons: (Comparison | null)[] = [
    (() => {
      const pA = getProduct('brennenstuhl-set-4');
      const pB = getProduct('aj-full-bundle-10');
      if (!pA || !pB) return null;
      return {
        id: 'comp-1',
        productA: pA,
        productB: pB,
        verdict: {
          en: "The Brennenstuhl set is the premium standard for medium homes, whereas the Aktion-Jeising bundle offers unbeatable value for large properties and landlords.",
          de: "Das Brennenstuhl-Set ist der Premium-Standard für mittlere Wohnungen, während das Aktion-Jeising-Bundle unschlagbaren Wert für große Immobilien und Vermieter bietet."
        },
        prosA: [
          { en: "Superior Wireless Stability", de: "Überlegene Funkstabilität" },
          { en: "High-Quality German Housing", de: "Hochwertiges deutsches Gehäuse" },
          { en: "Certified Reliability", de: "Zertifizierte Zuverlässigkeit" }
        ],
        prosB: [
          { en: "Lowest Cost per Unit", de: "Niedrigster Preis pro Stück" },
          { en: "Included Water Safety", de: "Inklusive Wasserschutz" },
          { en: "Magnetic Tool-free Mounting", de: "Werkzeuglose Magnetmontage" }
        ]
      };
    })(),
    (() => {
      const pA = getProduct('hekatron-premium');
      const pB = getProduct('x-sense-xs0b');
      if (!pA || !pB) return null;
      return {
        id: 'comp-2',
        productA: pA,
        productB: pB,
        verdict: {
          en: "Hekatron Genius Plus remains the German safety benchmark, but X-Sense offers a modern tech-forward alternative with smart diagnostics.",
          de: "Der Hekatron Genius Plus bleibt der deutsche Sicherheitsmaßstab, aber X-Sense bietet eine moderne, technikaffine Alternative mit smarter Diagnose."
        },
        prosA: [
          { en: "VdS Certified Quality", de: "VdS-zertifizierte Qualität" },
          { en: "Silent in Bedrooms", de: "Geräuschlos in Schlafräumen" },
          { en: "10-Year Sealed Battery", de: "Fest verbaute 10-Jahres-Batterie" }
        ],
        prosB: [
          { en: "Advanced Smart Hub Support", de: "Fortschrittliche Smart-Hub-Unterstützung" },
          { en: "Sleek Modern Aesthetics", de: "Elegante moderne Ästhetik" },
          { en: "Global Interlinking Tech", de: "Globale Vernetzungstechnologie" }
        ]
      };
    })()
  ];

  const validComparisons = comparisons.filter((c): c is Comparison => c !== null);

  if (validComparisons.length === 0) return null;

  return (
    <section id="blog" className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-red-600 font-bold text-sm uppercase tracking-widest mb-3">
            <Scale size={18} />
            {lang === 'en' ? 'Safety Comparisons' : 'Sicherheits-Vergleiche'}
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">{lang === 'en' ? 'Expert Product Face-offs' : 'Experten-Produktvergleiche'}</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            {lang === 'en' 
              ? "Confused about which safety gear fits your home? Our engineers compared our top-selling models to help you make an informed decision."
              : "Unsicher, welches Gerät zu Ihrem Zuhause passt? Unsere Ingenieure haben Top-Modelle verglichen, um Ihnen die Entscheidung zu erleichtern."}
          </p>
        </div>

        <div className="space-y-16">
          {validComparisons.map((comp) => (
            <div key={comp.id} className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Visual Comparison Area */}
                <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-slate-100 bg-slate-50/30">
                  <div className="flex items-center justify-between gap-4 mb-10">
                    <div className="text-center flex-1 group cursor-pointer" onClick={() => onNavigate('product-details', comp.productA.slug)}>
                      <div className="aspect-square bg-white rounded-3xl p-6 mb-4 border border-slate-100 shadow-sm mx-auto max-w-[180px] group-hover:scale-105 transition-transform duration-300">
                        <img src={comp.productA.imageUrl} alt={comp.productA.name[lang]} className="w-full h-full object-contain" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-red-600 transition-colors">{comp.productA.name[lang]}</h4>
                      <p className="text-red-600 font-black mt-1">{comp.productA.price}</p>
                    </div>
                    
                    <div className="flex flex-col items-center gap-2">
                      <div className="bg-slate-900 text-white text-xs font-black w-12 h-12 rounded-full flex items-center justify-center shadow-xl ring-4 ring-white">VS</div>
                    </div>

                    <div className="text-center flex-1 group cursor-pointer" onClick={() => onNavigate('product-details', comp.productB.slug)}>
                      <div className="aspect-square bg-white rounded-3xl p-6 mb-4 border border-slate-100 shadow-sm mx-auto max-w-[180px] group-hover:scale-105 transition-transform duration-300">
                        <img src={comp.productB.imageUrl} alt={comp.productB.name[lang]} className="w-full h-full object-contain" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-red-600 transition-colors">{comp.productB.name[lang]}</h4>
                      <p className="text-red-600 font-black mt-1">{comp.productB.price}</p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-slate-100 mb-8 shadow-sm">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                      <Scale size={14} className="text-red-600" />
                      {lang === 'en' ? 'Expert Verdict' : 'Experten-Urteil'}
                    </h5>
                    <p className="text-slate-700 italic leading-relaxed text-sm">"{comp.verdict[lang]}"</p>
                  </div>
                </div>

                {/* Pros and Actions Area */}
                <div className="p-8 lg:p-12 flex flex-col">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-12">
                    <div>
                      <h5 className="font-black text-slate-900 mb-5 flex items-center gap-2 text-sm uppercase tracking-wide">
                        <CheckCircle2 size={18} className="text-emerald-500" />
                        {comp.productA.name[lang].split(' ')[0]} {lang === 'en' ? 'Benefits' : 'Vorteile'}
                      </h5>
                      <ul className="space-y-4">
                        {comp.prosA.map((pro, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></span>
                            {pro[lang]}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-black text-slate-900 mb-5 flex items-center gap-2 text-sm uppercase tracking-wide">
                        <CheckCircle2 size={18} className="text-slate-400" />
                        {comp.productB.name[lang].split(' ')[0]} {lang === 'en' ? 'Benefits' : 'Vorteile'}
                      </h5>
                      <ul className="space-y-4">
                        {comp.prosB.map((pro, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-1.5 flex-shrink-0"></span>
                            {pro[lang]}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-auto pt-8 border-t border-slate-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <a 
                          href={comp.productA.affiliateLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 active:scale-[0.98]"
                        >
                          {lang === 'en' ? 'View Product A' : 'Produkt A ansehen'} <ExternalLink size={16} />
                        </a>
                        <button 
                          onClick={() => onNavigate('product-details', comp.productA.slug)}
                          className="w-full text-xs font-bold text-slate-400 hover:text-red-600 flex items-center justify-center gap-1 transition-colors"
                        >
                          <Eye size={12} /> {lang === 'en' ? 'Read Analysis' : 'Analyse lesen'}
                        </button>
                      </div>

                      <div className="space-y-3">
                        <a 
                          href={comp.productB.affiliateLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-4 rounded-2xl text-sm font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-600/10 active:scale-[0.98]"
                        >
                          {lang === 'en' ? 'View Product B' : 'Produkt B ansehen'} <ExternalLink size={16} />
                        </a>
                        <button 
                          onClick={() => onNavigate('product-details', comp.productB.slug)}
                          className="w-full text-xs font-bold text-slate-400 hover:text-red-600 flex items-center justify-center gap-1 transition-colors"
                        >
                          <Eye size={12} /> {lang === 'en' ? 'Read Analysis' : 'Analyse lesen'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
