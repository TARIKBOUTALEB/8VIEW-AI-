import React from 'react';
import { Layers, X, Archive, Shield } from 'lucide-react';
import { WorkflowImage } from '../types';

interface SidebarProps {
  images: WorkflowImage[];
  selectedId: number;
  onSelect: (id: number) => void;
  t: any;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ images, selectedId, onSelect, t, isOpen, onClose }) => {
  const getStatusIndicator = (status: WorkflowImage['status']) => {
    switch (status) {
      case 'Complété': return 'bg-primary shadow-[0_0_8px_rgba(139,92,246,0.4)]';
      case 'En cours': return 'bg-accent animate-pulse';
      case 'Échoué': return 'bg-red-500';
      case 'Brouillon': return 'bg-muted border border-white/10';
      default: return 'bg-muted';
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-full sm:w-[280px] pt-safe-top
        bg-surface border-r border-border flex flex-col h-full shrink-0 shadow-2xl md:shadow-none
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-4 border-b border-border flex items-center justify-between h-14">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted flex items-center gap-2">
            <Layers size={14} />
            {t.sidebar.executionList}
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-surfaceHighlight px-2 py-0.5 rounded text-muted">{images.length}</span>
            <button onClick={onClose} className="md:hidden text-muted hover:text-white p-2 -mr-2 active:scale-95 transition-transform">
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1 pb-safe-bottom">
          {images.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-48 text-muted/50">
                <Archive size={32} strokeWidth={1.5} className="mb-2" />
                <span className="text-xs">{t.sidebar.emptyHistory}</span>
             </div>
          ) : (
             images.map((image) => (
                <div
                  key={image.id}
                  onClick={() => {
                    onSelect(image.id);
                    if (window.innerWidth < 768) onClose();
                  }}
                  className={`group flex items-center gap-3 p-3 sm:p-2 rounded-xl sm:rounded-md cursor-pointer transition-all border active:scale-[0.98] ${
                    selectedId === image.id
                      ? 'bg-surfaceHighlight border-border'
                      : 'hover:bg-surfaceHighlight/50 border-transparent'
                  }`}
                >
                  <div className="w-12 h-12 sm:w-10 sm:h-10 rounded-lg sm:rounded bg-background border border-white/5 flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                    <img 
                        src={image.resultUrl || image.originalUrl} 
                        alt={image.name}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`font-medium text-sm sm:text-xs truncate ${selectedId === image.id ? 'text-white' : 'text-muted group-hover:text-gray-300'}`}>
                      {image.name}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                       <div className={`w-2 h-2 sm:w-1.5 sm:h-1.5 rounded-full ${getStatusIndicator(image.status)}`}></div>
                       <span className="text-xs sm:text-[10px] text-muted capitalize">{t.info.statusMap[image.status] || image.status}</span>
                    </div>
                  </div>
                  {selectedId === image.id && (
                      <div className="w-1.5 sm:w-1 h-10 sm:h-8 bg-primary rounded-full absolute left-0"></div>
                  )}
                </div>
              ))
          )}
        </div>

        {/* Legal Footer */}
        <div className="p-3 border-t border-border mt-auto pb-safe-bottom">
            <button className="flex items-center gap-2 w-full px-2 py-2 text-[10px] text-muted hover:text-white transition rounded hover:bg-surfaceHighlight/50">
                <Shield size={12} />
                {t.sidebar.legal}
            </button>
        </div>
      </aside>
    </>
  );
};