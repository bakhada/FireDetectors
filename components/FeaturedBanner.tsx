
import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Language, Product } from '../types';

interface FeaturedBannerProps {
  lang: Language;
  product: Product;
  onView: (p: Product) => void;
}

const FeaturedBanner: React.FC<FeaturedBannerProps> = ({ lang, product, onView }) => {
  return (
    <div className="col-span-1 sm:col-span-2 bg-slate-900 rounded-2xl overflow-hidden relative group border border-slate-800 shadow-2xl">
      <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
        <Sparkles size={120} className="text-red-600" />
      </div>
      
      <div className="flex flex-col md:flex-row items-center p-8 gap-8 relative z-10">
        <div className="w-full md:w-1/3 bg-white rounded-xl p-4 shadow-2xl">
          <img src={product.imageUrl} alt={product.name[lang]} className="w-full h-auto object-contain max-h-40" />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center gap-2 mb-3">
            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-black uppercase tracking-tighter">
              {lang === 'en' ? "Expert Recommendation" : "Experten-Empfehlung"}
            </div>
            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded bg-amber-500 text-slate-900 text-[10px] font-black uppercase tracking-tighter">
              {lang === 'en' ? "2026 BEST PICK" : "TOP-WAHL 2026"}
            </div>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white mb-3 leading-tight">
            {product.name[lang]}
          </h3>
          <p className="text-slate-400 text-sm mb-6 max-w-md line-clamp-2">
            {product.description[lang]}
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <button 
              onClick={() => onView(product)}
              className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all flex items-center gap-2"
            >
              {lang === 'en' ? "View Deal" : "Angebot prüfen"} <ArrowRight size={18} />
            </button>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-widest">
              <ShieldCheck size={16} /> {lang === 'en' ? "Top Security Choice" : "Top Sicherheits-Wahl"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBanner;
