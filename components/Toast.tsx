import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none w-full px-4 md:w-auto md:px-0">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onRemove: (id: string) => void }> = ({ toast, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const bgClass = 
    toast.type === 'success' ? 'bg-[#18181b] border-l-4 border-green-500 text-white' :
    toast.type === 'error' ? 'bg-[#18181b] border-l-4 border-red-500 text-white' :
    'bg-[#18181b] border-l-4 border-blue-500 text-white';

  const Icon = 
    toast.type === 'success' ? CheckCircle2 :
    toast.type === 'error' ? AlertCircle :
    CheckCircle2;

  return (
    <div className={`
      pointer-events-auto flex items-center gap-3 px-4 py-3 rounded shadow-2xl border border-white/10
      animate-in fade-in slide-in-from-bottom-5 duration-300 w-full md:min-w-[300px] max-w-md
      ${bgClass}
    `}>
      <Icon size={18} className={
        toast.type === 'success' ? 'text-green-500' :
        toast.type === 'error' ? 'text-red-500' : 'text-blue-500'
      } />
      <span className="text-sm font-medium flex-1">{toast.message}</span>
      <button onClick={() => onRemove(toast.id)} className="text-muted hover:text-white transition">
        <X size={14} />
      </button>
    </div>
  );
};
