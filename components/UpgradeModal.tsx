
import React from 'react';
import { Check, Star, Zap, X, Shield, Crown } from 'lucide-react';

interface UpgradeModalProps {
  t: any;
  onUpgrade: () => void;
  onClose: () => void;
  isPro?: boolean;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({ t, onUpgrade, onClose, isPro }) => {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-4xl bg-[#131315] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-muted hover:text-white transition bg-black/20 rounded-full p-1"
        >
          <X size={20} />
        </button>

        {/* Free Tier */}
        <div className="flex-1 p-8 border-b md:border-b-0 md:border-r border-white/10 flex flex-col">
          <div className="mb-6">
            <div className="text-xs font-bold text-muted uppercase tracking-wider mb-2">{t.upgrade.current}</div>
            <h3 className="text-2xl font-bold text-white mb-1">{t.upgrade.free.title}</h3>
            <div className="text-3xl font-bold text-white">{t.upgrade.free.price}</div>
          </div>
          
          <ul className="space-y-4 mb-8 flex-1">
            {t.upgrade.free.features.map((feature: string, i: number) => (
              <li key={i} className="flex items-center gap-3 text-sm text-gray-400">
                <Check size={16} className="text-gray-500 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
          
          <button 
            className="w-full py-3 rounded-lg border border-white/10 text-muted font-medium cursor-default opacity-50"
          >
            {isPro ? 'Inactive' : 'Active'}
          </button>
        </div>

        {/* Pro Tier */}
        <div className="flex-1 p-8 bg-gradient-to-b from-primary/10 to-transparent relative flex flex-col">
          <div className="absolute top-0 right-0 p-4">
             <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1">
                <Star size={10} fill="currentColor" />
                {t.upgrade.popular}
             </div>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
               {t.upgrade.pro.title}
               <Crown size={20} className="text-amber-400" fill="currentColor" />
            </h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">{t.upgrade.pro.price}</span>
              <span className="text-sm text-muted">{t.upgrade.pro.period}</span>
            </div>
          </div>

          <ul className="space-y-4 mb-8 flex-1">
            {t.upgrade.pro.features.map((feature: string, i: number) => (
              <li key={i} className="flex items-center gap-3 text-sm text-white">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                   <Check size={12} className="text-primary" />
                </div>
                {feature}
              </li>
            ))}
          </ul>

          <button 
            onClick={onUpgrade}
            disabled={isPro}
            className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 group transition-all duration-200 ${
                isPro 
                ? 'bg-surfaceHighlight text-muted cursor-not-allowed border border-white/5' 
                : 'bg-primary text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:bg-violet-500 hover:scale-[1.02] active:scale-95'
            }`}
          >
            {isPro ? (
                <>
                    {t.upgrade.active}
                    <Check size={18} />
                </>
            ) : (
                <>
                    {t.upgrade.pro.cta}
                    <Zap size={18} className="group-hover:fill-current" />
                </>
            )}
          </button>
          
          <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-muted">
            <Shield size={10} />
            Secure Payment via Stripe
          </div>
        </div>
      </div>
    </div>
  );
};
