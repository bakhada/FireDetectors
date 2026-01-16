
import React from 'react';
import { ExternalLink, Flame } from 'lucide-react';
import { Product, Language } from '../types';

interface ProductCardProps {
  product: Product;
  onViewDetails: (p: Product) => void;
  lang: Language;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails, lang }) => {
  // Logic for specialized conversion badges
  const isTopSeller = product.id === 'hekatron-premium' || product.id === 'aj-ultimate-10';
  const isBestValue = product.id === 'aj-smoke-10';

  return (
    <article 
      className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col h-full relative"
      itemScope 
      itemType="https://schema.org/Product"
    >
      {isTopSeller && (
        <div className="absolute top-2 right-2 z-10 animate-bounce">
          <div className="bg-amber-500 text-white text-[9px] font-black px-2 py-1 rounded-full shadow-lg border border-amber-400 flex items-center gap-1 uppercase tracking-tighter">
            <Flame size={10} /> {lang === 'en' ? "Best Seller" : "Bestseller"}
          </div>
        </div>
      )}

      {isBestValue && (
        <div className="absolute top-2 right-2 z-10">
          <div className="bg-emerald-600 text-white text-[9px] font-black px-2 py-1 rounded-full shadow-lg border border-emerald-500 flex items-center gap-1 uppercase tracking-tighter">
            {lang === 'en' ? "Best Price/Performance" : "Preis-Leistungs-Sieger"}
          </div>
        </div>
      )}

      <div 
        className="relative aspect-square overflow-hidden bg-slate-50 cursor-pointer"
        onClick={() => onViewDetails(product)}
      >
        <img
          src={product.imageUrl}
          alt={`${product.name[lang]}`}
          className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
          itemProp="image"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded border border-slate-100 uppercase tracking-wider text-slate-600 shadow-sm">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <h3 
          className="text-sm font-semibold text-slate-800 line-clamp-2 mb-2 min-h-[40px] cursor-pointer hover:text-red-600 transition-colors"
          onClick={() => onViewDetails(product)}
          itemProp="name"
        >
          {product.name[lang]}
        </h3>
        
        <div className="mt-auto">
          <div className="flex items-baseline justify-between mb-4">
            <span className="text-xl font-bold text-slate-900">{product.price}</span>
            <span className="text-[10px] text-slate-400 font-medium ml-1">Amazon Bestpreis</span>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            <a
              href={product.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-3 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-all shadow-md shadow-red-600/10 active:scale-95"
              onClick={(e) => e.stopPropagation()}
            >
              {lang === 'en' ? 'Buy Now' : 'Jetzt kaufen'} <ExternalLink size={16} />
            </a>
            <button
              onClick={() => onViewDetails(product)}
              className="flex items-center justify-center gap-2 py-2 px-3 text-slate-500 hover:text-slate-900 text-xs font-semibold transition-colors"
            >
              {lang === 'en' ? 'Expert Review' : 'Experten-Check'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
