
import React from 'react';
import { Flame, ShieldCheck, Truck, ChevronRight } from 'lucide-react';
import { ViewType } from '../types';

interface FooterProps {
  onOpenLegal: (type: 'imprint' | 'privacy' | 'terms') => void;
  onNavigate: (view: ViewType, id?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenLegal, onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="bg-red-600 p-1.5 rounded-lg text-white">
                <Flame size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                FireDetectors<span className="text-red-600">.de</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 mb-6">
              FireDetectors.de provides expert reviews and comparisons of <strong>interlinked smoke alarms</strong>, <strong>Hitzemelder</strong>, and <strong>smart fire protection systems</strong> for residential safety in Germany.
            </p>
            <div className="flex gap-4">
               <div className="bg-slate-800 p-3 rounded-xl border border-slate-700" title="Verified VdS Security Standards">
                  <ShieldCheck size={24} className="text-red-600" />
               </div>
               <div className="bg-slate-800 p-3 rounded-xl border border-slate-700" title="Secure Partner Shipping via Amazon">
                  <Truck size={24} className="text-slate-400" />
               </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Expert Safety Catalog</h4>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => onNavigate('products')} className="hover:text-red-500 transition-colors text-left" title="View all Interlinked Smoke Alarms">Radio-interlinked Alarms</button></li>
              <li><button onClick={() => onNavigate('products')} className="hover:text-red-500 transition-colors text-left" title="Kitchen Heat Detectors">Kitchen Heat Alarms</button></li>
              <li><button onClick={() => onNavigate('products')} className="hover:text-red-500 transition-colors text-left" title="10-Year Battery Smoke Detectors">10-Year Lithium Detectors</button></li>
              <li><button onClick={() => onNavigate('products')} className="hover:text-red-500 transition-colors text-left" title="Safety Sets for Large Homes">Home Protection Bundles</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Brandschutz Wissen</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('article-details', 'legal-requirements-faq-germany')} 
                  className="hover:text-red-500 transition-colors flex items-center gap-1 group text-left" 
                  title="Rauchmelder Pflicht: Legal Requirements"
                >
                  Legal Requirements FAQ <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('article-details', 'where-to-mount-smoke-alarms')} 
                  className="hover:text-red-500 transition-colors flex items-center gap-1 group text-left" 
                  title="Optimal Placement Guide"
                >
                  Where to mount Alarms? <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('article-details', 'battery-tech-comparison-lithium-vs-alkaline')} 
                  className="hover:text-red-500 transition-colors flex items-center gap-1 group text-left" 
                  title="Battery Maintenance Advice"
                >
                  Battery Tech Comparison <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Transparency</h4>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => onOpenLegal('imprint')} className="hover:text-red-500 transition-colors text-left">Impressum</button></li>
              <li><button onClick={() => onOpenLegal('privacy')} className="hover:text-red-500 transition-colors text-left">Privacy Policy</button></li>
              <li><button onClick={() => onOpenLegal('terms')} className="hover:text-red-500 transition-colors text-left">Affiliate Disclosure</button></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800">
          <div className="flex flex-wrap justify-center gap-4 text-[10px] text-slate-600 mb-6 uppercase tracking-widest font-bold">
            <span>Rauchmelder Test</span>
            <span>Funkrauchmelder</span>
            <span>DIN EN 14604</span>
            <span>VdS Zertifikat</span>
            <span>Hitzemelder Küche</span>
            <span>Brandschutz Deutschland</span>
          </div>
          <p className="text-xs text-center text-slate-500">© {new Date().getFullYear()} FireDetectors.de. Professional Fire Protection Reviews. An independent safety advisor platform.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
