import React, { useEffect, useState } from 'react';
import { Box, Layers, Download, ArrowRight, ShieldCheck } from 'lucide-react';

interface WelcomeModalProps {
  t: any;
  onClose: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ t, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay for animation
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for exit animation
  };

  return (
    <div className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div className={`
        relative w-full max-w-2xl bg-[#131315] border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] 
        flex flex-col overflow-hidden transform transition-all duration-500 ease-out
        ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}
      `}>
        
        {/* Decorative Top Bar */}
        <div className="h-1 w-full bg-gradient-to-r from-primary via-purple-400 to-secondary" />

        <div className="p-8 sm:p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
              {t.welcome.title}
            </h2>
            <p className="text-muted text-lg">
              {t.welcome.subtitle}
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-surface/50 border border-white/5 p-5 rounded-xl flex flex-col items-center text-center hover:bg-surfaceHighlight/50 transition duration-300">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
                <Box size={24} />
              </div>
              <h3 className="font-bold text-white mb-1">{t.welcome.step1Title}</h3>
              <p className="text-xs text-muted leading-relaxed">{t.welcome.step1Desc}</p>
            </div>

            <div className="bg-surface/50 border border-white/5 p-5 rounded-xl flex flex-col items-center text-center hover:bg-surfaceHighlight/50 transition duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition duration-300" />
              <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-4 relative z-10">
                <Layers size={24} />
              </div>
              <h3 className="font-bold text-white mb-1 relative z-10">{t.welcome.step2Title}</h3>
              <p className="text-xs text-muted leading-relaxed relative z-10">{t.welcome.step2Desc}</p>
            </div>

            <div className="bg-surface/50 border border-white/5 p-5 rounded-xl flex flex-col items-center text-center hover:bg-surfaceHighlight/50 transition duration-300">
              <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center mb-4">
                <Download size={24} />
              </div>
              <h3 className="font-bold text-white mb-1">{t.welcome.step3Title}</h3>
              <p className="text-xs text-muted leading-relaxed">{t.welcome.step3Desc}</p>
            </div>
          </div>

          {/* Footer / CTA */}
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-2 text-[10px] text-muted uppercase tracking-wider bg-white/5 px-3 py-1.5 rounded-full">
               <ShieldCheck size={12} />
               {t.welcome.privacyNote}
            </div>

            <button 
              onClick={handleClose}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 font-bold text-white bg-primary rounded-lg overflow-hidden transition-all duration-300 hover:bg-violet-500 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] active:scale-95"
            >
              {t.welcome.cta}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
