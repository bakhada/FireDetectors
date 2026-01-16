
import React from 'react';
import { X, ShieldCheck, Scale, FileText } from 'lucide-react';
import { Language } from '../types';

interface LegalModalProps {
  type: 'imprint' | 'privacy' | 'terms';
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

const LegalModal: React.FC<LegalModalProps> = ({ type, isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  const content = {
    imprint: {
      title: lang === 'en' ? "Imprint" : "Impressum",
      icon: <Scale size={20} className="text-slate-400" />,
      body: (
        <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
          <section>
            <h3 className="font-bold text-slate-900 mb-2">{lang === 'en' ? 'Information according to § 5 TMG' : 'Angaben gemäß § 5 TMG'}</h3>
            <p>FireDetectors.de Safety Solutions<br />Musterstraße 123<br />10115 Berlin, Germany</p>
          </section>
          <section>
            <h3 className="font-bold text-slate-900 mb-2">{lang === 'en' ? 'Represented by' : 'Vertreten durch'}</h3>
            <p>Max Mustermann</p>
          </section>
          <section>
            <h3 className="font-bold text-slate-900 mb-2">{lang === 'en' ? 'Contact' : 'Kontakt'}</h3>
            <p>{lang === 'en' ? 'Email: safety@firedetectors.de' : 'E-Mail: safety@firedetectors.de'}<br />{lang === 'en' ? 'Phone: +49 (0) 30 1234567' : 'Telefon: +49 (0) 30 1234567'}</p>
          </section>
          <section>
            <h3 className="font-bold text-slate-900 mb-2">{lang === 'en' ? 'VAT ID' : 'Umsatzsteuer-ID'}</h3>
            <p>{lang === 'en' ? 'Sales tax identification number according to § 27 a of the Sales Tax Law: DE 999 999 999' : 'Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE 999 999 999'}</p>
          </section>
          <section className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-2 text-xs uppercase tracking-wider">{lang === 'en' ? 'EU Dispute Resolution' : 'EU-Streitschlichtung'}</h3>
            <p className="text-xs">
              {lang === 'en' 
                ? 'The European Commission provides a platform for online dispute resolution (OS): https://ec.europa.eu/consumers/odr/. Our e-mail address can be found above in the imprint.' 
                : 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/. Unsere E-Mail-Adresse finden Sie oben im Impressum.'}
            </p>
          </section>
        </div>
      )
    },
    privacy: {
      title: lang === 'en' ? "Privacy Policy" : "Datenschutz",
      icon: <ShieldCheck size={20} className="text-slate-400" />,
      body: (
        <div className="space-y-6 text-sm text-slate-600 leading-relaxed max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
          <section>
            <h3 className="font-bold text-slate-900 mb-2">1. {lang === 'en' ? 'Data Protection at a Glance' : 'Datenschutz auf einen Blick'}</h3>
            <p>{lang === 'en' ? 'We take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with the statutory data protection regulations and this data protection declaration.' : 'Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.'}</p>
          </section>
          <section>
            <h3 className="font-bold text-slate-900 mb-2">2. {lang === 'en' ? 'Server Log Files' : 'Server-Log-Dateien'}</h3>
            <p>{lang === 'en' ? 'The provider of the pages automatically collects and stores information in server log files. This includes browser type, operating system, and IP address.' : 'Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien. Dies umfasst Browsertyp, Betriebssystem und IP-Adresse.'}</p>
          </section>
          <section className="p-4 bg-red-50 rounded-xl border border-red-100">
            <h3 className="font-bold text-red-900 mb-2">3. {lang === 'en' ? 'Google AdSense' : 'Google AdSense'}</h3>
            <p className="text-xs">
              {lang === 'en' 
                ? 'This website uses Google AdSense, a service for including advertisements from Google Inc. Google AdSense uses cookies and web beacons. Data processed may include your IP address and surfing behavior.' 
                : 'Diese Website nutzt Google AdSense, einen Dienst zum Einbinden von Werbeanzeigen der Google Inc. Google AdSense verwendet Cookies und Web Beacons. Zu den verarbeiteten Daten können Ihre IP-Adresse und Ihr Surfverhalten gehören.'}
            </p>
          </section>
          <section>
            <h3 className="font-bold text-slate-900 mb-2">4. {lang === 'en' ? 'Amazon Affiliate Program' : 'Amazon Partnerprogramm'}</h3>
            <p>
              {lang === 'en' 
                ? 'The operator of this site participates in the Amazon EU Partner Program. On our pages, advertisements and links to the site of Amazon.de are included, by which we can earn money via advertising cost reimbursement.' 
                : 'Der Betreiber dieser Seite ist Teilnehmer am Partnerprogramm von Amazon EU. Auf unseren Seiten werden Werbeanzeigen und Links zur Seite von Amazon.de eingebunden, an denen wir über Werbekostenerstattung Geld verdienen können.'}
            </p>
          </section>
          <section>
            <h3 className="font-bold text-slate-900 mb-2">5. {lang === 'en' ? 'Your Rights' : 'Ihre Rechte'}</h3>
            <p>{lang === 'en' ? 'You have the right to receive information about the origin, recipient, and purpose of your stored personal data at any time free of charge.' : 'Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten.'}</p>
          </section>
        </div>
      )
    },
    terms: {
      title: lang === 'en' ? "Affiliate Disclosure" : "Affiliate-Offenlegung",
      icon: <FileText size={20} className="text-slate-400" />,
      body: (
        <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
          <p className="font-medium text-slate-800">
            {lang === 'en' 
              ? 'Transparency is our priority. Please read how we maintain this site.' 
              : 'Transparenz ist unsere Priorität. Bitte lesen Sie, wie wir diese Seite finanzieren.'}
          </p>
          <section>
            <p>
              {lang === 'en' 
                ? 'FireDetectors.de is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com, Amazon.de, or other Amazon properties.' 
                : 'FireDetectors.de ist Teilnehmer am Partnerprogramm von Amazon EU, einem Affiliate-Werbeprogramm, das zur Bereitstellung eines Mediums für Websites konzipiert wurde, mittels dessen durch die Platzierung von Werbeanzeigen und Links zu Amazon.de Werbekostenerstattungen verdient werden können.'}
            </p>
          </section>
          <section className="bg-amber-50 p-4 rounded-xl border border-amber-100">
            <h3 className="font-bold text-amber-900 mb-2 text-xs uppercase tracking-wider">{lang === 'en' ? 'No Extra Cost' : 'Keine Extrakosten'}</h3>
            <p className="text-xs">
              {lang === 'en' 
                ? 'Clicking on an affiliate link does not increase the price you pay. We receive a small commission from the retailer, which helps us provide free fire safety advice and high-quality reviews.' 
                : 'Das Klicken auf einen Affiliate-Link erhöht den Preis, den Sie zahlen, nicht. Wir erhalten eine kleine Provision vom Händler, die uns hilft, kostenlose Brandschutzberatung und hochwertige Reviews anzubieten.'}
            </p>
          </section>
          <section>
            <h3 className="font-bold text-slate-900 mb-2">{lang === 'en' ? 'Editorial Independence' : 'Redaktionelle Unabhängigkeit'}</h3>
            <p>
              {lang === 'en' 
                ? 'Our reviews are based on technical specifications and safety standards (VdS/DIN). Affiliate relationships do not influence our safety ratings.' 
                : 'Unsere Bewertungen basieren auf technischen Spezifikationen und Sicherheitsstandards (VdS/DIN). Affiliate-Beziehungen beeinflussen unsere Sicherheitsbewertungen nicht.'}
            </p>
          </section>
        </div>
      )
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-50 rounded-lg">
              {content[type].icon}
            </div>
            <h2 className="font-bold text-lg text-slate-900">{content[type].title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-8 max-h-[70vh] overflow-y-auto">
          {content[type].body}
        </div>
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors"
          >
            {lang === 'en' ? 'Close' : 'Schließen'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
