
import React from 'react';
import { ARTICLES } from '../constants';
import { Article, Language } from '../types';
import { Clock, User, Calendar, ArrowRight, BookOpenText } from 'lucide-react';

interface SafetyArticlesProps {
  onViewArticle: (article: Article) => void;
  lang: Language;
}

const SafetyArticles: React.FC<SafetyArticlesProps> = ({ onViewArticle, lang }) => {
  return (
    <section id="articles" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-red-600 font-bold text-sm uppercase tracking-widest mb-3">
              <BookOpenText size={18} />
              {lang === 'en' ? 'Educational Safety Guides' : 'Sicherheits-Ratgeber'}
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">{lang === 'en' ? 'Knowledge Hub' : 'Wissens-Zentrum'}</h2>
            <p className="text-slate-500 text-lg">
              {lang === 'en' ? 'Expert articles on fire prevention.' : 'Experten-Artikel zur Brandprävention.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article) => (
            <div 
              key={article.id} 
              className="group cursor-pointer flex flex-col bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300"
              onClick={() => onViewArticle(article)}
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img src={article.imageUrl} alt={article.title[lang]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-slate-400 font-medium mb-4">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {article.date}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {article.readTime[lang]}</span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-red-600 transition-colors line-clamp-2">
                  {article.title[lang]}
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  {article.summary[lang]}
                </p>
                
                <div className="mt-auto pt-6 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">{article.author}</span>
                  <button className="text-red-600 font-bold text-sm flex items-center gap-1">
                    {lang === 'en' ? 'Read Guide' : 'Weiterlesen'} <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SafetyArticles;
