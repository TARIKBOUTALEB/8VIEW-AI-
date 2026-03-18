
import React from 'react';
import { WorkflowImage } from '../types';

interface InfoPanelProps {
  image?: WorkflowImage;
  t: any;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ image, t }) => {
  if (!image) {
    return (
      <div className="min-h-[100px] md:h-36 bg-surface border-t border-white/5 p-6 flex items-center justify-center shrink-0">
          <p className="text-muted text-[10px] font-black uppercase tracking-[0.3em] text-center opacity-40">{t.info.noSelection}</p>
      </div>
    );
  }

  return (
    <div className="bg-surface border-t border-white/5 p-4 sm:p-6 flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-10 shrink-0 md:h-36 overflow-y-auto no-scrollbar pb-safe-bottom">
        <div className="flex flex-row md:flex-col justify-between items-center md:items-start md:w-72 md:border-r border-white/5 md:pr-8 pb-3 md:pb-0 border-b md:border-b-0 shrink-0">
            <div className="flex-1 min-w-0 mr-4 sm:mr-6">
                <h3 className="text-sm sm:text-lg font-black text-white mb-1 sm:mb-2 truncate italic uppercase tracking-tighter">{image.name}</h3>
                <p className="text-[8px] sm:text-[10px] text-muted font-mono uppercase truncate tracking-widest opacity-40">{image.id}</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <span className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${image.status === 'Complété' ? 'bg-primary shadow-[0_0_8px_rgba(255,42,42,0.6)]' : image.status === 'En cours' ? 'bg-accent animate-pulse' : 'bg-muted'}`}></span>
                <span className="text-[8px] sm:text-[10px] font-black text-muted uppercase tracking-widest">{t.info.statusMap[image.status]}</span>
            </div>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-y-4 flex-1">
            <div className="flex flex-col">
                <span className="text-[7px] sm:text-[9px] uppercase text-muted font-black tracking-widest mb-0.5 sm:mb-1 opacity-40">{t.info.format}</span>
                <span className="text-[10px] sm:text-xs text-white font-black tracking-tighter truncate uppercase italic">{image.format}</span>
            </div>
            <div className="flex flex-col">
                <span className="text-[7px] sm:text-[9px] uppercase text-muted font-black tracking-widest mb-0.5 sm:mb-1 opacity-40">{t.info.dimensions}</span>
                <span className="text-[10px] sm:text-xs text-white font-black tracking-tighter truncate uppercase italic">{image.dimensions}</span>
            </div>
            <div className="flex flex-col">
                <span className="text-[7px] sm:text-[9px] uppercase text-muted font-black tracking-widest mb-0.5 sm:mb-1 opacity-40">{t.info.size}</span>
                <span className="text-[10px] sm:text-xs text-white font-black tracking-tighter truncate uppercase italic">{image.size}</span>
            </div>
            <div className="flex flex-col hidden sm:flex">
                <span className="text-[7px] sm:text-[9px] uppercase text-muted font-black tracking-widest mb-0.5 sm:mb-1 opacity-40">{t.info.type}</span>
                <span className="text-[10px] sm:text-xs text-white font-black tracking-tighter truncate uppercase italic">{image.type}</span>
            </div>
            <div className="flex flex-col col-span-2 sm:col-span-1">
                <span className="text-[7px] sm:text-[9px] uppercase text-muted font-black tracking-widest mb-0.5 sm:mb-1 opacity-40">{t.info.engine}</span>
                <span className="text-[10px] sm:text-xs text-primary font-black tracking-tighter truncate uppercase italic drop-shadow-[0_0_5px_rgba(255,42,42,0.3)]">Gemini 3 Pro Image</span>
            </div>
             <div className="flex flex-col">
                <span className="text-[7px] sm:text-[9px] uppercase text-muted font-black tracking-widest mb-0.5 sm:mb-1 opacity-40">{t.info.date}</span>
                <span className="text-[10px] sm:text-xs text-white font-black tracking-tighter truncate uppercase italic">{image.date}</span>
            </div>
        </div>
    </div>
  );
};
