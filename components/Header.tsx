
import React, { useRef, useState } from 'react';
import { Upload, Download, Globe, ChevronDown, Image as ImageIcon, Menu, Layers, Zap } from 'lucide-react';
import { Language } from '../translations';

interface HeaderProps {
  onImport: (files: File[]) => void;
  onExportComposite: () => void;
  onExportLayers: () => void;
  isExportDisabled: boolean;
  t: any;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onImport, 
  onExportComposite,
  onExportLayers, 
  isExportDisabled, 
  t, 
  currentLang, 
  onLanguageChange,
  onToggleSidebar,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const expertInputRef = useRef<HTMLInputElement>(null);
  const [isImportMenuOpen, setIsImportMenuOpen] = useState(false);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onImport(Array.from(files));
    }
    if (event.target) event.target.value = '';
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
    <header className="pt-safe-top h-[calc(4rem+env(safe-area-inset-top))] bg-surface border-b border-white/5 flex items-center justify-between px-6 sm:px-10 z-50 shrink-0 transition-all shadow-xl">
      <div className="flex items-center gap-3 sm:gap-6">
        <button 
          onClick={onToggleSidebar}
          className="md:hidden p-2 -ml-2 text-muted hover:text-white transition"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2 sm:gap-3 group cursor-default">
           <div className="relative flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 transition-all">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-full h-full text-primary"
              >
                <circle cx="12" cy="8" r="4" />
                <circle cx="12" cy="16" r="4" />
              </svg>
           </div>
           <div className="flex flex-col items-start leading-none gap-0.5 sm:gap-1">
              <span className="text-white text-[10px] sm:text-[12px] font-black tracking-[0.4em] sm:tracking-[0.5em] italic whitespace-nowrap uppercase">8 VIEW AI</span>
              <span className="text-primary text-[5px] sm:text-[6px] font-black tracking-[0.5em] sm:tracking-[0.6em] whitespace-nowrap uppercase opacity-40">STUDIO RENDER</span>
           </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4 sm:gap-6">
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*,image/gif" 
        />
        <input 
          type="file" 
          ref={expertInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*,image/gif" 
          multiple 
        />
        
        {/* EXPORT MENU */}
        <div className="relative">
            <button 
              onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
              disabled={isExportDisabled}
              className={`flex items-center justify-center gap-3 px-5 py-2.5 rounded-full text-[10px] font-black tracking-widest transition-all ${
                isExportDisabled 
                  ? 'text-muted/20 border border-white/5 cursor-not-allowed' 
                  : 'text-white hover:bg-white/[0.03] bg-white/[0.01] border border-white/10'
              }`}
            >
              <Download size={15} />
              <span className="hidden sm:inline uppercase">{t.header.export}</span>
              <ChevronDown size={14} className={`hidden sm:block transition-transform ${isExportMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isExportMenuOpen && !isExportDisabled && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsExportMenuOpen(false)}></div>
                    <div className="absolute top-full right-0 mt-4 w-60 bg-surface border border-white/10 rounded-2xl shadow-2xl z-50 p-1.5 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                        <button
                            onClick={() => { onExportComposite(); setIsExportMenuOpen(false); }}
                            className="w-full text-left px-4 py-3 text-[10px] font-black tracking-widest text-white hover:bg-white/5 rounded-xl flex items-center gap-3 transition uppercase"
                        >
                            <ImageIcon size={15} className="text-primary" />
                            {t.header.saveComposite}
                        </button>
                        <button
                            onClick={() => { onExportLayers(); setIsExportMenuOpen(false); }}
                            className="w-full text-left px-4 py-3 text-[10px] font-black tracking-widest text-white hover:bg-white/5 rounded-xl flex items-center gap-3 transition uppercase"
                        >
                            <Layers size={15} className="text-primary" />
                            {t.header.saveLayers}
                        </button>
                    </div>
                </>
            )}
        </div>

        {/* IMPORT MENU */}
        <div className="relative">
            <button 
              onClick={() => setIsImportMenuOpen(!isImportMenuOpen)}
              className="flex items-center gap-3 px-6 py-2.5 rounded-full text-[10px] font-black tracking-[0.3em] bg-primary text-white hover:bg-accent transition shadow-lg border border-white/5 active:scale-95 duration-200 uppercase"
            >
              <Upload size={15} />
              <span className="hidden xs:inline">{t.header.import}</span>
              <ChevronDown size={14} className={`transition-transform ${isImportMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isImportMenuOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsImportMenuOpen(false)}></div>
                    <div className="absolute top-full right-0 mt-4 w-64 bg-surface border border-white/10 rounded-2xl shadow-2xl z-50 p-1.5 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                        <button
                            onClick={() => { fileInputRef.current?.click(); setIsImportMenuOpen(false); }}
                            className="w-full text-left px-4 py-3 text-[10px] font-black tracking-widest text-white hover:bg-white/5 rounded-xl flex items-center gap-3 transition uppercase"
                        >
                            <ImageIcon size={15} className="text-muted" />
                            {t.app.singleSource}
                        </button>
                        <div className="h-[1px] bg-white/5 my-1 mx-2"></div>
                        <button
                            onClick={() => { expertInputRef.current?.click(); setIsImportMenuOpen(false); }}
                            className="w-full text-left px-4 py-3 text-[10px] font-black tracking-widest text-primary hover:bg-primary/5 rounded-xl flex items-center gap-3 transition uppercase group"
                        >
                            <Zap size={15} className="group-hover:animate-pulse" />
                            {t.app.expertMode}
                        </button>
                    </div>
                </>
            )}
        </div>

        {/* LANG MENU */}
        <div className="relative mr-2 sm:mr-4">
            <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="w-10 h-10 rounded-full bg-white/[0.02] text-muted flex items-center justify-center hover:bg-white hover:text-black transition-all border border-white/5"
            >
                <Globe size={18} />
            </button>
            {isLangOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)}></div>
                    <div className="absolute top-full right-0 mt-4 w-40 bg-surface border border-white/10 rounded-2xl shadow-2xl z-50 p-1.5 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                        {languages.map(l => (
                            <button
                                key={l.code}
                                onClick={() => { onLanguageChange(l.code); setIsLangOpen(false); }}
                                className={`w-full text-left px-4 py-2.5 text-[10px] font-black tracking-widest hover:bg-white/5 rounded-xl transition uppercase ${currentLang === l.code ? 'text-primary' : 'text-muted'}`}
                            >
                                {l.label}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
      </div>
    </header>
  );
};
