
import React from 'react';
import { AlertCircle, ChevronRight } from 'lucide-react';
import { Language } from '../types';

interface AnnouncementBarProps {
  lang: Language;
  onNavigate: (view: any, id?: string) => void;
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ lang, onNavigate }) => {
  const content = {
    en: "🔥 2026 Safety Update: New Smoke Alarm Mandates apply. Ensure your home is protected.",
    de: "🔥 Brandschutz-Update 2026: Neue Rauchmelderpflicht beachten. Jetzt rechtzeitig vorsorgen!"
  };
  
  const link = {
    en: "Check Requirements",
    de: "Pflicht prüfen"
  };

  return (
    <div className="bg-gradient-to-r from-red-600 to-amber-600 text-white py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wide">
          <AlertCircle size={16} className="animate-pulse" />
          {content[lang]}
        </div>
        <button 
          onClick={() => onNavigate('article-details', 'legal-requirements-faq-germany')}
          className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase transition-all flex items-center gap-1 border border-white/30"
        >
          {link[lang]} <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBar;
