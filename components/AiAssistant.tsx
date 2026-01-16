
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, ShieldCheck, Sparkles } from 'lucide-react';
import { getAiResponse } from '../services/geminiService';
import { Message, Language } from '../types';

interface AiAssistantProps {
  lang: Language;
}

const AiAssistant: React.FC<AiAssistantProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const welcome = lang === 'en' 
      ? "Hello! I'm your Fire Safety Advisor. Ask me anything!"
      : "Hallo! Ich bin Ihr Brandschutz-Experte. Fragen Sie mich etwas!";
    setMessages([{ role: 'assistant', content: welcome }]);
  }, [lang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const prompt = lang === 'en' 
      ? `(User Language: English) ${userMsg}`
      : `(User Sprache: Deutsch) ${userMsg}`;

    const response = await getAiResponse(prompt, messages);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen ? (
        <div className="w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col mb-4 overflow-hidden h-[500px]">
          <div className="bg-slate-900 px-4 py-3 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">{lang === 'en' ? 'Safety Advisor' : 'Sicherheits-Expert'}</h3>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white"><X size={20} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-slate-900 text-white' : 'bg-white shadow-sm border border-slate-100'}`}>
                  {m.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input
              type="text"
              placeholder={lang === 'en' ? "Type a question..." : "Frage stellen..."}
              className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-2 text-sm outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} disabled={isLoading} className="text-red-600"><Send size={18} /></button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="bg-slate-900 text-white px-6 py-4 rounded-full flex gap-3 items-center shadow-2xl hover:scale-105 transition-all">
          <span className="font-bold">{lang === 'en' ? 'Ask AI Advisor' : 'KI-Experte fragen'}</span>
          <Sparkles size={20} className="text-red-500" />
        </button>
      )}
    </div>
  );
};

export default AiAssistant;
