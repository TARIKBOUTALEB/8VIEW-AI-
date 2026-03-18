
import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import JSZip from 'jszip';
import { MOCK_IMAGES } from './constants';
import { WorkflowImage, PipelineStep } from './types';
import { translations, Language } from './translations';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { InfoPanel } from './components/InfoPanel';
import { LandingPage } from './components/LandingPage';
import { RenameModal } from './components/RenameModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import { 
  Activity, Layout, Scan, X, Layers, Columns, Grid3X3, BookOpen
} from 'lucide-react';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('fr');
  const t = (translations as any)[lang] || translations['en'];
  const [showLanding, setShowLanding] = useState(true);
  const [images, setImages] = useState<WorkflowImage[]>(MOCK_IMAGES);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [pipelineStep, setPipelineStep] = useState<PipelineStep>('idle');
  const [is3DView, setIs3DView] = useState<boolean>(false);
  const [isComparisonMode, setIsComparisonMode] = useState<boolean>(false);
  const [isCompositeMode, setIsCompositeMode] = useState<boolean>(false);
  const [isSeparateExplorerOpen, setIsSeparateExplorerOpen] = useState<boolean>(false);
  const [zoomLevel] = useState<number>(100);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [axisStart, setAxisStart] = useState({ h: 1, v: 1 });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const expertInputRef = useRef<HTMLInputElement>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [showConfirmation, setShowConfirmation] = useState<{files: File[], previews: string[], isExpert: boolean} | null>(null);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [renameValue, setRenameValue] = useState('');
  
  const [viewsMatrix, setViewsMatrix] = useState<{ [key: string]: string }>({});
  const [currentAxis, setCurrentAxis] = useState({ h: 1, v: 1 });

  const selectedImage = images.find(img => img.id === selectedId);

  const addToast = (type: ToastMessage['type'], message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message }]);
  };
  const removeToast = (id: string) => setToasts(prev => prev.filter(t => t.id !== id));

  const handleImageSelect = (id: number) => {
    setSelectedId(id);
    setIs3DView(false);
    setIsComparisonMode(false);
    setIsCompositeMode(false);
    setIsSeparateExplorerOpen(false);
    setViewsMatrix({});
    const img = images.find(i => i.id === id);
    if (img && img.status === 'Complété') setPipelineStep('complete');
    else setPipelineStep('idle');
  };

  const handleGenerate = async () => {
    if (!selectedImage || pipelineStep !== 'idle') return;
    
    if ((window as any).aistudio) {
        const hasKey = await (window as any).aistudio.hasSelectedApiKey();
        if (!hasKey) await (window as any).aistudio.openSelectKey();
    }
    
    setImages(prev => prev.map(img => img.id === selectedId ? { ...img, status: 'En cours' } : img));
    
    try {
      setPipelineStep('segmentation');
      await new Promise(r => setTimeout(r, 1000));
      setPipelineStep('geometry');
      
      let apiKey = '';
      try {
        apiKey = process.env.API_KEY || '';
      } catch (e) {
        // Ignore ReferenceError if process is not defined
      }
      if (!apiKey) {
        // @ts-ignore
        apiKey = import.meta.env.VITE_API_KEY || '';
      }
        
      if (!apiKey) {
        throw new Error("Clé API non trouvée. Si vous êtes sur Vercel/Netlify, ajoutez VITE_API_KEY dans vos variables d'environnement.");
      }

      const ai = new GoogleGenAI({ apiKey });
      const sourceUrls = (selectedImage as any).sourceViews || [selectedImage.originalUrl];
      const isExpert = (selectedImage as any).isExpert;
      
      const imageParts = sourceUrls.map((url: string) => {
          const base64Data = url.split(',')[1];
          const mimeType = url.split(';')[0].split(':')[1];
          return { inlineData: { data: base64Data, mimeType: mimeType } };
      });

      const promptText = `TASK: HIGH-FIDELITY FULL-COLOR PHOTOGRAPHIC STUDIO CHARACTER SHEET.
        INPUT CONTEXT: ${isExpert ? 'MULTIPLE PHOTOS PROVIDED.' : 'SINGLE SOURCE IMAGE.'}
        
        STRICT COLOR & RENDER RULES:
        1. NO WIREFRAME. NO MESH. NO TOPOLOGY LINES.
        2. DO NOT GENERATE BLUE OR RED OUTLINES.
        3. RESPECT ORIGINAL COLORS, TEXTURES, AND LIGHTING EXACTLY.
        4. BACKGROUND: PURE SOLID BLACK (#000000).
        5. OUTPUT: ONE 3x3 GRID (9 VIEWS).
        
        VIEW GRID POSITIONS:
        Row 0: Front-Left-ISO, Top, Front-Right-ISO
        Row 1: Left, Front, Right
        Row 2: Back, Bottom, Back-Right-ISO
        
        Maintain pixel-perfect scale consistency between all 9 tiles.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: { parts: [...imageParts, { text: promptText }] },
        config: { imageConfig: { aspectRatio: "1:1", imageSize: "1K" } }
      });

      setPipelineStep('rendering'); 
      await new Promise(r => setTimeout(r, 1000));
      
      let res = '';
      response.candidates?.[0]?.content?.parts?.forEach(p => { 
        if (p.inlineData) res = `data:image/png;base64,${p.inlineData.data}`; 
      });
      
      if (!res) throw new Error("Aucune image générée par le modèle");

      setImages(prev => prev.map(img => img.id === selectedId ? { ...img, resultUrl: res, status: 'Complété' } : img));
      setPipelineStep('complete');
      addToast('success', "Planche Studio validée en couleurs réelles.");
    } catch (e: any) {
      console.error("AI Generation Error:", e);
      setPipelineStep('idle');
      setImages(prev => prev.map(img => img.id === selectedId ? { ...img, status: 'Échoué' } : img));
      addToast('error', `Erreur: ${e.message || "Échec de l'analyse AI"}`);
    }
  };

  const handleDownloadFullStudioSheet = async () => {
    if (!selectedImage || !selectedImage.resultUrl) return;
    addToast('info', "Génération de l'export composite...");

    try {
        const sourceImg = new Image();
        const resultImg = new Image();
        sourceImg.crossOrigin = "anonymous";
        resultImg.crossOrigin = "anonymous";
        
        sourceImg.src = selectedImage.originalUrl;
        resultImg.src = selectedImage.resultUrl;

        await Promise.all([
            new Promise(r => sourceImg.onload = r),
            new Promise(r => resultImg.onload = r)
        ]);

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // On définit une largeur cible pour chaque partie (1024px par défaut)
        const partWidth = 1024;
        const partHeight = 1024;
        const gutter = 40; // Espace entre les deux planches
        
        canvas.width = (partWidth * 2) + gutter;
        canvas.height = partHeight;

        // Fond Noir
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Dessiner l'image source à gauche (centrée dans son carré de 1024x1024)
        const sScale = Math.min(partWidth / sourceImg.width, partHeight / sourceImg.height);
        const sw = sourceImg.width * sScale;
        const sh = sourceImg.height * sScale;
        ctx.drawImage(sourceImg, (partWidth - sw) / 2, (partHeight - sh) / 2, sw, sh);

        // Dessiner le séparateur vertical
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(partWidth + (gutter / 2), 100);
        ctx.lineTo(partWidth + (gutter / 2), partHeight - 100);
        ctx.stroke();

        // Dessiner le rendu 9-vues à droite
        ctx.drawImage(resultImg, partWidth + gutter, 0, partWidth, partHeight);

        // Téléchargement
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `${selectedImage.name}_FULL_STUDIO_SHEET.png`;
        link.click();
        addToast('success', "Planche Composite téléchargée.");
    } catch (err) {
        addToast('error', "Erreur lors de l'export composite.");
    }
  };

  const handleSeparateDownload = async (filenameOverride: string) => {
    if (!selectedImage || !selectedImage.resultUrl) return;
    
    setShowRenameModal(false);
    addToast('info', "Génération du pack ZIP...");
    
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = selectedImage.resultUrl;
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      
      const zip = new JSZip();
      const folderName = filenameOverride.replace(/\s+/g, '_');
      const folder = zip.folder(folderName) || zip;
      
      const canvas = document.createElement('canvas');
      const w = Math.floor(img.width / 3);
      const h = Math.floor(img.height / 3);
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const viewLabels = ["ISO_FL", "TOP", "ISO_FR", "LEFT", "FRONT", "RIGHT", "BACK", "BOTTOM", "ISO_BR"];
      let idx = 0;

      for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
          ctx.clearRect(0, 0, w, h);
          ctx.drawImage(img, x * w, y * h, w, h, 0, 0, w, h);
          const base64Data = canvas.toDataURL('image/png').split(',')[1];
          folder.file(`${folderName}_${viewLabels[idx++]}.png`, base64Data, { base64: true });
        }
      }

      const content = await zip.generateAsync({ type: "blob" });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = `${folderName}_STUDIO_PACK.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      addToast('success', "ZIP téléchargé avec succès.");
    } catch (err) {
      addToast('error', "Erreur ZIP.");
    }
  };

  const extract3DMatrix = async (url: string) => {
    const img = new Image();
    img.src = url;
    await new Promise(r => img.onload = r);
    const canvas = document.createElement('canvas');
    const w = img.width / 3;
    const h = img.height / 3;
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const matrix: { [key: string]: string } = {};
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            ctx.clearRect(0,0,w,h);
            ctx.drawImage(img, x*w, y*h, w, h, 0, 0, w, h);
            matrix[`${x}-${y}`] = canvas.toDataURL('image/png');
        }
    }
    setViewsMatrix(matrix);
  };

  const handleOpenExplorer = async () => {
    if (!selectedImage || !selectedImage.resultUrl) return;
    if (Object.keys(viewsMatrix).length === 0) {
        await extract3DMatrix(selectedImage.resultUrl);
    }
    setIsSeparateExplorerOpen(true);
  };

  const handleReconstruct3D = async () => {
    if (!selectedImage || !selectedImage.resultUrl) return;
    setIsComparisonMode(false);
    setIsCompositeMode(false);
    setIsSeparateExplorerOpen(false);
    setPipelineStep('meshing');
    try {
        await extract3DMatrix(selectedImage.resultUrl);
        setIs3DView(true);
        setCurrentAxis({ h: 1, v: 1 });
        setPipelineStep('complete');
    } catch (err) {
        addToast('error', "Erreur de matrice.");
        setPipelineStep('complete');
    }
  };

  const handle3DDrag = (e: any) => {
    if (!isDragging || !is3DView) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const dx = clientX - dragStart.x;
    const dy = clientY - dragStart.y;
    const sensitivity = 65;
    const stepH = Math.round(dx / sensitivity);
    const stepV = Math.round(dy / (sensitivity * 1.2));
    let newH = axisStart.h + stepH;
    let newV = axisStart.v + stepV;
    newV = Math.max(0, Math.min(2, newV));
    newH = ((newH % 3) + 3) % 3;
    if (newH !== currentAxis.h || newV !== currentAxis.v) {
        setCurrentAxis({ h: newH, v: newV });
    }
  };

  const handleBulkImport = async (files: File[]) => {
      const isExpert = files.length > 1;
      const previews: string[] = [];
      for (const file of files) {
          const reader = new FileReader();
          const p = new Promise<string>((resolve) => {
              reader.onload = (e) => resolve(e.target?.result as string);
          });
          reader.readAsDataURL(file);
          previews.push(await p);
      }
      setShowConfirmation({ files, previews, isExpert });
  };

  const finalizeImport = () => {
    if (!showConfirmation) return;
    const firstFile = showConfirmation.files[0];
    const format = firstFile.type.split('/')[1].toUpperCase();
    const sizeKb = Math.round(firstFile.size / 1024);
    const sizeStr = sizeKb > 1024 ? `${(sizeKb/1024).toFixed(1)} MB` : `${sizeKb} KB`;
    const img: WorkflowImage = { 
        id: Date.now(), 
        name: firstFile.name.split('.')[0] + (showConfirmation.isExpert ? ' (BUNDLE)' : ''), 
        type: 'multi-view', 
        originalUrl: showConfirmation.previews[0], 
        resultUrl: '', dimensions: "1K", size: sizeStr, format: format, date: new Date().toLocaleDateString(), status: 'Brouillon' 
    };
    (img as any).sourceViews = showConfirmation.previews;
    (img as any).isExpert = showConfirmation.isExpert;
    setImages([img, ...images]); 
    setSelectedId(img.id); 
    setShowConfirmation(null);
  };

  const labels = [
    ["ISO-FL", "TOP", "ISO-FR"],
    ["LEFT", "FRONT", "RIGHT"],
    ["BACK", "BOTTOM", "ISO-BR"]
  ];

  return (
    <div className="flex flex-col h-screen-safe bg-background text-text overflow-hidden">
      {showLanding && <LandingPage t={t} onEnter={() => setShowLanding(false)} currentLang={lang} onLanguageChange={setLang} />}
      
      {showRenameModal && (
        <RenameModal t={t} initialValue={renameValue} onSave={handleSeparateDownload} onClose={() => setShowRenameModal(false)} />
      )}
      
      {showConfirmation && (
         <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-black/98 backdrop-blur-3xl">
            <div className={`bg-surface border border-white/5 rounded-3xl sm:rounded-[3rem] p-6 sm:p-12 max-w-3xl w-full text-center shadow-2xl relative overflow-hidden max-h-[90vh] flex flex-col`}>
               <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 shrink-0">
                  <div className={`px-3 sm:px-4 py-1 rounded-full text-[8px] sm:text-[10px] font-black tracking-widest uppercase italic border ${showConfirmation.isExpert ? 'border-primary text-primary bg-primary/5' : 'border-white/10 text-muted'}`}>
                     {showConfirmation.isExpert ? 'EXPERT BUNDLE MODE' : 'SINGLE SOURCE'}
                  </div>
                  <div className="text-white/20 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest">{showConfirmation.files.length} FILE(S)</div>
               </div>
               <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3 mb-6 sm:mb-10 overflow-y-auto p-4 sm:p-6 bg-black/40 rounded-2xl sm:rounded-[2rem] border border-white/5 no-scrollbar shrink">
                   {showConfirmation.previews.map((prev, idx) => (
                       <div key={idx} className="relative aspect-square">
                          <img src={prev} className="w-full h-full object-contain rounded-lg sm:rounded-xl bg-surfaceHighlight border border-white/10" />
                       </div>
                   ))}
               </div>
               <div className="shrink-0">
                 <h3 className="text-2xl sm:text-4xl font-black text-white uppercase italic tracking-tighter mb-8 sm:mb-12">SYNTHÈSE STUDIO AI</h3>
                 <div className="flex flex-col gap-3 sm:gap-4">
                    <button onClick={finalizeImport} className="w-full py-4 sm:py-6 bg-primary text-white text-[10px] sm:text-[12px] font-black tracking-[0.3em] sm:tracking-[0.5em] rounded-xl sm:rounded-2xl hover:bg-accent transition shadow-2xl uppercase italic flex items-center justify-center gap-3 sm:gap-4 active:scale-95">
                       <Layers size={18} className="w-4 h-4 sm:w-5 sm:h-5" /> INTÉGRER AU WORKFLOW
                    </button>
                    <button onClick={() => setShowConfirmation(null)} className="w-full py-3 text-muted hover:text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest transition-colors active:scale-95">ANNULER L'IMPORT</button>
                 </div>
               </div>
            </div>
         </div>
      )}

      <Header 
        onImport={handleBulkImport} 
        onExportComposite={handleDownloadFullStudioSheet}
        onExportLayers={() => { 
            if (!selectedImage) return;
            setRenameValue(selectedImage.name.replace(/\(BUNDLE\)/g, '').trim() || 'Asset'); 
            setShowRenameModal(true); 
        }}
        isExportDisabled={!selectedImage || selectedImage.status !== 'Complété'}
        t={t} currentLang={lang} onLanguageChange={setLang} onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar images={images} selectedId={selectedId || 0} onSelect={handleImageSelect} t={t} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="flex-1 flex flex-col relative bg-background studio-grid overflow-hidden">
          <div className="h-12 sm:h-14 border-b border-white/5 bg-black/40 backdrop-blur-xl px-4 sm:px-8 flex justify-between items-center z-40 shrink-0">
             <div className="flex items-center gap-2 sm:gap-6">
                <div className="flex items-center gap-2 sm:gap-3 text-white/20 text-[9px] sm:text-[10px] font-black tracking-widest uppercase italic">
                  <span className="hidden sm:inline">VIEWPORT:</span> 
                  <Layout size={14} className="sm:ml-2" /> 
                  <Scan size={14} />
                </div>
             </div>
             <div className="flex items-center gap-2 sm:gap-4 text-muted text-[9px] sm:text-[10px] font-mono tracking-widest uppercase">
                {selectedImage?.status === 'En cours' && <span className="text-primary animate-pulse mr-2 sm:mr-4">[AI RENDERING]</span>}
                {zoomLevel}% <span className="hidden sm:inline">SCALE</span>
             </div>
          </div>
          <div className="flex-1 relative overflow-hidden">
             
             {/* 3D VIEWPORT */}
             {is3DView && Object.keys(viewsMatrix).length > 0 && (
                <div className="absolute inset-0 z-30 bg-background flex items-center justify-center select-none">
                    <div className="relative w-full h-full flex items-center justify-center cursor-move"
                        onMouseDown={(e) => { setIsDragging(true); setDragStart({ x: e.clientX, y: e.clientY }); setAxisStart({...currentAxis}); }}
                        onMouseMove={handle3DDrag} onMouseUp={() => setIsDragging(false)} onMouseLeave={() => setIsDragging(false)}
                        onTouchStart={(e) => { setIsDragging(true); setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY }); setAxisStart({...currentAxis}); }}
                        onTouchMove={handle3DDrag} onTouchEnd={() => setIsDragging(false)}
                    >
                        <img src={viewsMatrix[`${currentAxis.h}-${currentAxis.v}`]} className="max-h-[85vh] object-contain drop-shadow-[0_0_120px_rgba(255,42,42,0.15)] pointer-events-none" />
                        <div className="absolute top-10 left-10 p-6 bg-black/60 backdrop-blur-3xl border border-white/5 rounded-3xl pointer-events-none border-l-4 border-l-primary shadow-2xl">
                            <div className="flex items-center gap-3 text-primary text-[10px] font-black tracking-[0.4em] uppercase mb-1"><Scan size={16} /> STUDIO NAVIGATION</div>
                            <p className="text-white text-[12px] font-black uppercase italic tracking-tighter">
                                {labels[currentAxis.v][currentAxis.h]}
                            </p>
                        </div>
                        <div className="absolute bottom-10 flex gap-4 pointer-events-auto">
                            <button onClick={() => setIs3DView(false)} className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full text-[10px] font-black tracking-widest uppercase border border-white/10 transition-all">RETOUR PLANCHE</button>
                        </div>
                    </div>
                </div>
             )}

             {/* COMPOSITE SHEET VIEW (REFERENCE + GRID SIDE BY SIDE) */}
             {isCompositeMode && selectedImage && (
                 <div className="absolute inset-0 z-[55] bg-black flex flex-col md:flex-row items-center justify-center animate-in fade-in duration-700 select-none overflow-hidden">
                    <div className="flex-1 w-full h-full flex items-center justify-center p-8 bg-black">
                        <img src={selectedImage.originalUrl} className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="w-[1px] h-3/4 bg-white/10 hidden md:block"></div>
                    <div className="h-[1px] w-3/4 bg-white/10 md:hidden"></div>
                    <div className="flex-1 w-full h-full flex items-center justify-center p-8 bg-black">
                        <img src={selectedImage.resultUrl} className="max-w-full max-h-full object-contain" />
                    </div>
                    <button 
                        onClick={() => setIsCompositeMode(false)}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 px-10 py-4 bg-white text-black font-black text-[10px] tracking-[0.4em] uppercase rounded-full hover:bg-primary hover:text-white transition-all shadow-2xl z-50 flex items-center gap-3 italic"
                    >
                        <X size={16} /> {t.app.exit}
                    </button>
                    <div className="absolute top-8 left-8 text-white/20 text-[10px] font-black tracking-[0.5em] uppercase italic">PLANCHE COMPOSITE STUDIO AI</div>
                 </div>
             )}

             {/* SEPARATE VIEW EXPLORER */}
             {isSeparateExplorerOpen && (
                 <div className="absolute inset-0 z-[60] bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center p-12 overflow-y-auto no-scrollbar animate-in zoom-in-95 duration-500">
                    <button onClick={() => setIsSeparateExplorerOpen(false)} className="absolute top-10 right-10 text-muted hover:text-white transition-all"><X size={32} /></button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl pb-20">
                        {Object.entries(viewsMatrix).map(([key, data]: [string, string]) => {
                            const [x, y] = key.split('-').map(Number);
                            return (
                                <div key={key} className="flex flex-col gap-4 group">
                                    <div className="relative aspect-square bg-surface border border-white/10 rounded-[2rem] p-4 shadow-2xl group-hover:border-primary/40 transition-all overflow-hidden">
                                        <img src={data} className="w-full h-full object-contain" />
                                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-1 rounded-full border border-white/5 text-[10px] font-black text-white/40 tracking-widest uppercase">
                                            {labels[y][x]}
                                        </div>
                                    </div>
                                    <button onClick={() => {
                                        const link = document.createElement('a');
                                        link.href = data;
                                        link.download = `${selectedImage?.name}_${labels[y][x]}.png`;
                                        link.click();
                                    }} className="text-[9px] font-black tracking-[0.3em] text-muted hover:text-primary uppercase transition-colors">Télécharger cette vue</button>
                                </div>
                            );
                        })}
                    </div>
                 </div>
             )}

             {/* COMPARISON VIEWPORT */}
             {isComparisonMode && selectedImage && (
                 <div className="absolute inset-0 z-[45] bg-background flex flex-col md:flex-row animate-in fade-in duration-500">
                    <div className="flex-1 relative flex items-center justify-center p-8 bg-black/40 border-r border-white/5 overflow-hidden group">
                        <div className="absolute top-8 left-8 z-10 bg-black/60 backdrop-blur-md px-5 py-2 rounded-full border border-white/10">
                            <span className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">{t.app.source}</span>
                        </div>
                        <img src={selectedImage.originalUrl} className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl" />
                    </div>
                    <div className="flex-1 relative flex items-center justify-center p-8 overflow-hidden group">
                        <div className="absolute top-8 right-8 z-10 bg-primary/20 backdrop-blur-md px-5 py-2 rounded-full border border-primary/20">
                            <span className="text-[10px] font-black tracking-[0.4em] text-primary uppercase">{t.app.studio}</span>
                        </div>
                        <img src={selectedImage.resultUrl} className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl" />
                    </div>
                    <button 
                        onClick={() => setIsComparisonMode(false)}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 px-10 py-4 bg-white text-black font-black text-[10px] tracking-[0.4em] uppercase rounded-full hover:bg-primary hover:text-white transition-all shadow-2xl z-50 flex items-center gap-3"
                    >
                        <X size={16} /> {t.app.exit}
                    </button>
                 </div>
             )}

             {/* MAIN VIEWPORT */}
             <div className={`w-full h-full relative bg-background flex items-center justify-center transition-all duration-700 ${is3DView || isComparisonMode || isSeparateExplorerOpen || isCompositeMode ? 'opacity-0 pointer-events-none scale-110 blur-xl' : 'opacity-100 scale-100'}`}>
                {!selectedImage ? (
                    <div onClick={() => expertInputRef.current?.click()} className="w-80 h-80 rounded-[5rem] bg-white/[0.01] border-2 border-dashed border-white/10 hover:border-primary/40 flex flex-col items-center justify-center cursor-pointer mb-10 transition-all hover:bg-white/[0.03] group relative overflow-hidden">
                        <Layers size={64} className="text-muted/10 group-hover:text-primary/20 transition-all duration-500" />
                        <span className="mt-8 text-[11px] font-black tracking-[0.5em] uppercase text-muted group-hover:text-white transition-colors italic text-center px-8">IMPORTER SOURCES MULTIPLES</span>
                    </div>
                ) : (
                    <div className="relative group p-10">
                        {(selectedImage as any).isExpert && selectedImage.status === 'Brouillon' ? (
                            <div className="relative grid grid-cols-2 gap-2 max-w-md bg-surface border border-white/10 p-4 rounded-[3rem] shadow-2xl overflow-hidden">
                                {(selectedImage as any).sourceViews.slice(0, 4).map((v: string, i: number) => (
                                    <img key={i} src={v} className="w-full aspect-square object-cover rounded-2xl opacity-40" />
                                ))}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={handleGenerate} className="px-12 py-6 bg-primary text-white text-[12px] font-black tracking-[0.4em] rounded-2xl hover:bg-accent transition-all shadow-2xl uppercase italic">STUDIO COLOR RENDER</button>
                                </div>
                            </div>
                        ) : (
                            <img src={selectedImage.resultUrl || selectedImage.originalUrl} className="max-h-[80vh] rounded-[3rem] shadow-2xl border border-white/5 relative z-10" />
                        )}
                        {selectedImage.status === 'Brouillon' && !(selectedImage as any).isExpert && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] rounded-[3rem] z-30 opacity-0 hover:opacity-100 transition-opacity duration-500">
                                <button onClick={handleGenerate} className="px-20 py-8 bg-primary text-white text-[14px] font-black tracking-[0.6em] rounded-2xl hover:bg-accent transition-all shadow-2xl uppercase italic">GÉNÉRER PLANCHE STUDIO</button>
                            </div>
                        )}
                        {selectedImage.status === 'Complété' && (
                            <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-2 sm:gap-4 w-full px-2 sm:px-0">
                                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full max-w-2xl">
                                    <button 
                                        onClick={handleReconstruct3D} 
                                        className="flex-1 sm:flex-none justify-center px-3 sm:px-6 py-3 sm:py-4 bg-black/80 backdrop-blur-3xl border border-primary/30 text-primary hover:text-white hover:bg-primary transition-all rounded-xl sm:rounded-full text-[8px] sm:text-[10px] font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase shadow-2xl flex items-center gap-2 sm:gap-3 italic active:scale-95"
                                    >
                                        <Activity size={16} className="sm:w-[18px] sm:h-[18px]" /> <span className="hidden xs:inline">{t.app.reconstruct3D}</span><span className="xs:hidden">3D</span>
                                    </button>
                                    <button 
                                        onClick={() => setIsCompositeMode(true)} 
                                        className="flex-1 sm:flex-none justify-center px-3 sm:px-6 py-3 sm:py-4 bg-black/80 backdrop-blur-3xl border border-white/10 text-white hover:bg-white hover:text-black transition-all rounded-xl sm:rounded-full text-[8px] sm:text-[10px] font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase shadow-2xl flex items-center gap-2 sm:gap-3 italic active:scale-95"
                                    >
                                        <BookOpen size={16} className="sm:w-[18px] sm:h-[18px]" /> <span className="hidden xs:inline">{t.app.compositeSheet}</span><span className="xs:hidden">COMPOSITE</span>
                                    </button>
                                    <button 
                                        onClick={handleOpenExplorer} 
                                        className="flex-1 sm:flex-none justify-center px-3 sm:px-6 py-3 sm:py-4 bg-black/80 backdrop-blur-3xl border border-white/10 text-white hover:bg-white hover:text-black transition-all rounded-xl sm:rounded-full text-[8px] sm:text-[10px] font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase shadow-2xl flex items-center gap-2 sm:gap-3 italic active:scale-95"
                                    >
                                        <Grid3X3 size={16} className="sm:w-[18px] sm:h-[18px]" /> <span className="hidden xs:inline">{t.app.exploreViews}</span><span className="xs:hidden">EXPLORER</span>
                                    </button>
                                    <button 
                                        onClick={() => setIsComparisonMode(true)} 
                                        className="flex-1 sm:flex-none justify-center px-3 sm:px-6 py-3 sm:py-4 bg-black/80 backdrop-blur-3xl border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all rounded-xl sm:rounded-full text-[8px] sm:text-[10px] font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase shadow-2xl flex items-center gap-2 sm:gap-3 italic active:scale-95"
                                    >
                                        <Columns size={16} className="sm:w-[18px] sm:h-[18px]" /> <span className="hidden xs:inline">{t.app.compare}</span><span className="xs:hidden">COMPARE</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
             </div>
             {pipelineStep !== 'idle' && pipelineStep !== 'complete' && (
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 bg-black/98 backdrop-blur-3xl px-14 py-8 rounded-[2.5rem] border border-white/10 flex items-center gap-12 shadow-2xl border-b-2 border-b-primary overflow-hidden">
                    <div className="relative"><div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div></div>
                    <div className="flex flex-col">
                        <span className="text-[13px] font-black tracking-[0.5em] text-white uppercase italic">
                            {pipelineStep === 'rendering' ? "FUSION CHROMATIQUE..." : "STUDIO PREVIEW..."}
                        </span>
                    </div>
                </div>
             )}
          </div>
          <InfoPanel image={selectedImage} t={t} />
        </main>
      </div>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*,image/gif" onChange={(e) => { if(e.target.files && e.target.files[0]) handleBulkImport([e.target.files[0]]); }} />
      <input type="file" ref={expertInputRef} className="hidden" accept="image/*,image/gif" multiple onChange={(e) => { if(e.target.files && e.target.files.length > 0) handleBulkImport(Array.from(e.target.files)); }} />
    </div>
  );
};

export default App;
