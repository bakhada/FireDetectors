
import React, { useState, useMemo } from 'react';
import { ArrowLeft, Clock, User, Calendar, Share2, Twitter, MessageCircle, Link as LinkIcon, Check, Heart, ShieldCheck } from 'lucide-react';
import { Article, Language, ViewType } from '../types';
import SEO from './SEO';

interface ArticleDetailsProps {
  article: Article;
  onBack: () => void;
  lang: Language;
  onNavigate: (view: ViewType, slugOrId?: string) => void;
}

const ArticleDetails: React.FC<ArticleDetailsProps> = ({ article, onBack, lang, onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}${window.location.pathname}#/brandschutz-ratgeber/${article.slug}`;
  const shareText = lang === 'en' 
    ? `Vital Safety Guide: ${article.title[lang]}. Highly recommended fire protection advice.`
    : `Wichtiger Ratgeber: ${article.title[lang]}. Experten-Tipps zum Brandschutz.`;

  const articleSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title[lang],
    "image": [article.imageUrl],
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "FireDetectors.de",
      "logo": {
        "@type": "ImageObject",
        "url": `${window.location.origin}/logo.png`
      }
    },
    "datePublished": article.date,
    "description": article.summary[lang]
  }), [article, lang]);

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
        "name": lang === 'en' ? "Knowledge Hub" : "Wissenszentrum",
        "item": `${window.location.origin}/#/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title[lang],
        "item": shareUrl
      }
    ]
  }), [article, lang, shareUrl]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title[lang],
        text: article.summary[lang],
        url: shareUrl,
      }).catch(console.error);
    } else {
      handleCopyLink();
    }
  };

  const t = {
    back: lang === 'en' ? 'Back to Knowledge Hub' : 'Zurück zum Wissenszentrum',
    guide: lang === 'en' ? 'Expert Safety Guide' : 'Experten-Ratgeber',
    read: lang === 'en' ? 'read' : 'Lesezeit',
    authorTitle: lang === 'en' ? 'Certified Safety Consultant' : 'Zertifizierter Sicherheitsberater',
    share: lang === 'en' ? 'Share Guide' : 'Teilen',
    sharePrompt: lang === 'en' ? 'Help someone stay safe today' : 'Helfen Sie anderen, sicher zu bleiben',
    shareDesc: lang === 'en' ? 'Knowledge saves lives. Share this guide with a friend, neighbor, or family member.' : 'Wissen rettet Leben. Teilen Sie diesen Ratgeber mit Freunden oder Nachbarn.',
    copy: lang === 'en' ? 'Copy Link' : 'Link kopieren',
    copied: lang === 'en' ? 'Link Copied!' : 'Kopiert!',
  };

  const parseInlineLinks = (text: string) => {
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      const linkText = match[1];
      const url = match[2];
      if (url.startsWith('#/')) {
        parts.push(
          <button
            key={match.index}
            onClick={() => {
              const route = url.replace('#/rauchmelder-vergleich/', '');
              onNavigate('product-details', route);
            }}
            className="text-red-600 font-bold hover:underline"
          >
            {linkText}
          </button>
        );
      } else {
        parts.push(
          <a
            key={match.index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 font-bold hover:underline"
          >
            {linkText}
          </a>
        );
      }
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    return parts.length > 0 ? parts : text;
  };

  const contentStr = article.content[lang] || '';

  const renderStructuredContent = () => {
    const lines = contentStr.split('\n');
    
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      
      if (trimmed.startsWith('## ')) {
        const text = trimmed.replace('## ', '');
        return (
          <h2 key={idx} className="text-3xl font-black mt-16 mb-8 text-slate-900 tracking-tight leading-tight border-b border-slate-100 pb-4">
            {text}
          </h2>
        );
      }
      
      if (trimmed.startsWith('### ')) {
        const text = trimmed.replace('### ', '');
        return (
          <h3 key={idx} className="text-2xl font-bold mt-10 mb-6 text-slate-800">
            {text}
          </h3>
        );
      }
      
      if (trimmed.startsWith('* ')) {
        const text = trimmed.replace('* ', '');
        return (
          <li key={idx} className="ml-6 mb-4 list-none relative text-slate-600 font-medium pl-6">
            <span className="absolute left-0 top-2.5 w-2 h-2 bg-red-500 rounded-full"></span>
            {parseInlineLinks(text)}
          </li>
        );
      }

      if (trimmed.startsWith('Expert Tip:')) {
        return (
          <div key={idx} className="my-8 p-6 bg-red-50 border-l-4 border-red-500 rounded-r-2xl italic text-red-900 font-medium">
            {parseInlineLinks(trimmed)}
          </div>
        );
      }

      if (trimmed.length === 0) return null;

      return (
        <p key={idx} className="mb-6 text-slate-600 leading-relaxed text-lg">
          {parseInlineLinks(trimmed)}
        </p>
      );
    });
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO schema={articleSchema} />
      <SEO schema={breadcrumbSchema} />
      
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-semibold mb-12 transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        {t.back}
      </button>

      <header className="mb-12">
        <div className="flex items-center gap-4 text-sm font-semibold text-red-600 mb-6 uppercase tracking-widest">
          <ShieldCheck size={18} />
          <span>{t.guide}</span>
          <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
          <span className="text-slate-500">{article.readTime[lang]} {t.read}</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
          {article.title[lang]}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-6 py-8 border-y border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500">
              <User size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">{article.author}</p>
              <p className="text-xs text-slate-500">{t.authorTitle}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-8">
            <div className="hidden sm:flex items-center gap-2 text-slate-400">
              <Calendar size={18} />
              <span className="text-sm font-medium">{article.date}</span>
            </div>
            <button 
              onClick={handleNativeShare}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all flex items-center gap-2"
            >
              <Share2 size={20} />
              <span className="text-xs font-bold hidden sm:inline">{t.share}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-100 aspect-video relative group">
        <img src={article.imageUrl} alt={article.title[lang]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
      </div>

      <div className="max-w-none">
        {renderStructuredContent()}
      </div>

      <div className="mt-20 py-16 border-t border-slate-100 bg-slate-900 rounded-[2.5rem] px-8 text-white">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-600 text-white mb-6 shadow-xl shadow-red-600/30">
            <Heart size={28} fill="currentColor" className="animate-pulse" />
          </div>
          <h3 className="text-2xl font-bold mb-4">{t.sharePrompt}</h3>
          <p className="text-slate-400 mb-10 max-w-md text-lg">{t.shareDesc}</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
            >
              <MessageCircle size={20} /> WhatsApp
            </a>
            <a 
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-white/10 text-white rounded-2xl font-bold hover:bg-white/20 backdrop-blur-md transition-all active:scale-95"
            >
              <Twitter size={20} /> X / Twitter
            </a>
            <button 
              onClick={handleCopyLink}
              className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all active:scale-95 ${copied ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-white text-slate-900 hover:bg-slate-100'}`}
            >
              {copied ? <Check size={20} /> : <LinkIcon size={20} />}
              {copied ? t.copied : t.copy}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleDetails;
