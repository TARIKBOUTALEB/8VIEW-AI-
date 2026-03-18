
import React, { useState, useEffect, useRef } from 'react';
import { X, Save, FolderInput } from 'lucide-react';

interface RenameModalProps {
  t: any;
  initialValue: string;
  onSave: (newName: string) => void;
  onClose: () => void;
}

export const RenameModal: React.FC<RenameModalProps> = ({ t, initialValue, onSave, onClose }) => {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input on mount
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSave(value.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-sm bg-[#131315] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-white transition"
        >
          <X size={20} />
        </button>

        <div className="p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-4">
               <FolderInput size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">{t.header.renameTitle}</h3>
            <p className="text-muted text-[10px] uppercase tracking-widest opacity-40">Nom de l'archive ZIP</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input 
                ref={inputRef}
                type="text" 
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full bg-surface border border-border rounded-lg py-3 px-4 text-center text-white font-bold focus:outline-none focus:border-primary transition placeholder:font-normal uppercase tracking-widest text-xs"
                placeholder={t.header.renamePlaceholder}
                required
              />
            </div>

            <div className="flex gap-3">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-lg border border-white/10 text-muted hover:text-white hover:bg-white/5 transition font-medium text-[10px] uppercase tracking-widest"
              >
                {t.header.cancel}
              </button>
              <button 
                type="submit"
                className="flex-1 bg-primary text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-accent transition shadow-[0_0_20px_rgba(255,42,42,0.3)] text-[10px] uppercase tracking-widest"
              >
                <Save size={18} />
                {t.header.downloadZip}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
