
import React from 'react';
import { Search, Flame, Languages } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  onSearch: (term: string) => void;
  onNavigate: (view: 'home' | 'products' | 'blog') => void;
  lang: Language;
  onLangChange: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onNavigate, lang, onLangChange }) => {
  const t = {
    home: lang === 'en' ? 'Safety Home' : 'Startseite',
    catalog: lang === 'en' ? 'Detector Catalog' : 'Melder-Katalog',
    knowledge: lang === 'en' ? 'Safety Knowledge' : 'Experten-Wissen',
    search: lang === 'en' ? 'Search Rauchmelder...' : 'Melder suchen...',
    verified: lang === 'en' ? 'DIN EN 14604 Verified' : 'DIN EN 14604 Geprüft'
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => onNavigate('home')}
          >
            <div className="bg-red-600 p-1.5 rounded-lg text-white group-hover:bg-red-700 transition-colors">
              <Flame size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              FireDetectors<span className="text-red-600">.de</span>
            </span>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 ml-10 mr-auto">
            <button onClick={() => onNavigate('home')} className="text-sm font-semibold text-slate-600 hover:text-red-600 transition-colors">{t.home}</button>
            <button onClick={() => onNavigate('products')} className="text-sm font-semibold text-slate-600 hover:text-red-600 transition-colors">{t.catalog}</button>
            <button onClick={() => onNavigate('blog')} className="text-sm font-semibold text-slate-600 hover:text-red-600 transition-colors">{t.knowledge}</button>
          </nav>

          {/* Search & Lang Switcher */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative max-w-[200px]">
              <input
                type="text"
                placeholder={t.search}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                onChange={(e) => onSearch(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full">
              <button 
                onClick={() => onLangChange('de')} 
                className={`w-8 h-8 rounded-full text-[10px] font-black transition-all ${lang === 'de' ? 'bg-white shadow-sm text-red-600' : 'text-slate-400'}`}
              >
                DE
              </button>
              <button 
                onClick={() => onLangChange('en')} 
                className={`w-8 h-8 rounded-full text-[10px] font-black transition-all ${lang === 'en' ? 'bg-white shadow-sm text-red-600' : 'text-slate-400'}`}
              >
                EN
              </button>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg hidden sm:flex">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{t.verified}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
