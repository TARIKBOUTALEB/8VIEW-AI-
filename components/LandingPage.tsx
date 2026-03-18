
import React, { useState } from 'react';
import { Check, Menu } from 'lucide-react';
import { Language } from '../translations';

interface LandingPageProps {
  t: any;
  onEnter: () => void;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ t, onEnter, currentLang, onLanguageChange }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(onEnter, 800); 
  };
  
  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'es', label: 'Español' },
    { code: 'pt', label: 'Português' },
    { code: 'it', label: 'Italiano' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'ja', label: '日本語' },
    { code: 'ar', label: 'العربية' },
    { code: 'zh', label: '中文' }
  ];

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-[#050505] transition-all duration-1000 ease-in-out flex flex-col items-center justify-center overflow-hidden ${isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'}`}
    >
      {/* Intense Neon Red Style for Landing Only */}
      <style>{`
        .neon-red { color: #ff2a2a; filter: drop-shadow(0 0 15px rgba(255, 42, 42, 0.6)); }
        .neon-border { border-color: rgba(255, 42, 42, 0.3); box-shadow: 0 0 30px rgba(255, 42, 42, 0.1); }
        .neon-button:hover { color: #ff2a2a; border-color: #ff2a2a; box-shadow: 0 0 40px rgba(255, 42, 42, 0.2); }
      `}</style>

      {/* Texture de mur sombre */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(335deg, #ffffff 5px, transparent 5px),
                            linear-gradient(155deg, #ffffff 5px, transparent 5px),
                            linear-gradient(335deg, #ffffff 5px, transparent 5px),
                            linear-gradient(155deg, #ffffff 5px, transparent 5px)`,
          backgroundSize: '58px 58px',
          backgroundPosition: '0px 2px, 4px 35px, 29px 31px, 34px 6px'
        }}
      ></div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff0000]/5 rounded-full blur-[160px] pointer-events-none"></div>
      
      {/* Langue Burger */}
      <div className="absolute top-10 right-10 z-50">
        <div className="relative">
          <button 
             onClick={() => setIsLangOpen(!isLangOpen)}
             className="flex items-center gap-3 p-3 bg-white/[0.02] hover:bg-white/[0.08] border border-white/5 rounded-full text-white/40 hover:text-white transition-all backdrop-blur-xl"
          >
             <Menu size={22} />
             <span className="text-[10px] font-black tracking-[0.2em] ml-1">{currentLang.toUpperCase()}</span>
          </button>
          
          {isLangOpen && (
            <>
                <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)}></div>
                <div className="absolute top-full right-0 mt-4 w-44 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => {
                                onLanguageChange(lang.code);
                                setIsLangOpen(false);
                            }}
                            className={`w-full text-left px-5 py-3 text-[10px] font-black tracking-[0.2em] hover:bg-white/5 transition flex items-center justify-between ${
                                currentLang === lang.code ? 'text-[#ff2a2a]' : 'text-muted'
                            }`}
                        >
                            {lang.label.toUpperCase()}
                            {currentLang === lang.code && <Check size={12} />}
                        </button>
                    ))}
                </div>
            </>
          )}
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-16">
          <div className="flex flex-col items-center group">
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 mb-12">
                  <svg 
                    viewBox="0 0 100 100" 
                    className="w-full h-full text-[#ff2a2a] transition-all duration-1000 group-hover:scale-[1.02]"
                  >
                    <defs>
                        <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="1.5" result="blur1" />
                            <feGaussianBlur stdDeviation="4" result="blur2" />
                            <feMerge>
                                <feMergeNode in="blur2" />
                                <feMergeNode in="blur1" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    
                    <g filter="url(#neon-glow)">
                        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.6" />
                        <circle cx="50" cy="37" r="19" fill="none" stroke="currentColor" strokeWidth="4.5" />
                        <circle cx="50" cy="63" r="19" fill="none" stroke="currentColor" strokeWidth="4.5" />
                        <circle cx="50" cy="50" r="2" fill="currentColor" />
                    </g>
                  </svg>
              </div>
              
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-[0.5em] sm:tracking-[0.8em] uppercase italic transition-all duration-700 group-hover:tracking-[0.7em] sm:group-hover:tracking-[1em] drop-shadow-[0_0_20px_rgba(255,42,42,0.4)] text-center ml-[0.5em] sm:ml-[0.8em] group-hover:ml-[0.7em] sm:group-hover:ml-[1em]">
                 8 VIEW AI
              </h1>
          </div>

          <button 
            onClick={handleEnter}
            className="neon-button group relative px-10 md:px-16 py-4 md:py-6 border border-white/5 text-white text-[10px] md:text-[12px] font-black tracking-[0.4em] md:tracking-[0.6em] uppercase rounded-full bg-white/[0.01] transition-all duration-700 shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ff2a2a]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="relative">
                {t.landing.enter}
            </span>
          </button>
      </div>
      
      <div className="absolute bottom-8 md:bottom-12 left-0 right-0 text-center opacity-10 px-4">
          <p className="text-[7px] md:text-[9px] font-black tracking-[0.5em] md:tracking-[2em] text-white uppercase leading-relaxed">IMAGE • GIF TURNAROUND • TURNAROUND VIDEO • STUDIO QUALITY</p>
      </div>
    </div>
  );
};
