
export type Language = 'fr' | 'en' | 'ar' | 'zh' | 'es' | 'hi' | 'ja' | 'it' | 'pt';

export const translations: Record<string, any> = {
  fr: {
    header: {
      title: "8 VIEW AI",
      import: "IMPORT",
      export: "Exportation",
      saveComposite: "Planche Studio",
      saveLayers: "ZIP (Vues séparées)",
      save3D: "Modèle 3D",
      renameTitle: "Nom de l'Asset",
      renamePlaceholder: "Nom de l'Asset",
      downloadZip: "Exporter ZIP",
      cancel: "Annuler"
    },
    sidebar: {
      executionList: "Studio Gallery",
      emptyHistory: "Aucun rendu généré",
      legal: "Mentions Légales"
    },
    info: {
      noSelection: "Sélectionnez un Asset pour analyse",
      statusMap: {
        'Complété': 'Studio Ready',
        'En cours': 'Génération AI...',
        'Échoué': 'Erreur Critique',
        'Brouillon': 'En attente'
      },
      format: "Format", engine: "Engine", dimensions: "Resolution", size: "Poids", type: "Type", date: "Date Gen"
    },
    app: {
      singleSource: "Mode Photo Unique",
      quadView: "Assemblage Manuel",
      expertMode: "MODE EXPERT (Multi-Photos)",
      reconstruct3D: "Visionneuse 3D",
      compare: "Comparatif",
      exploreViews: "Explorer les vues",
      compositeSheet: "Planche Composite",
      exit: "Quitter",
      source: "SOURCE",
      studio: "STUDIO AI",
      exportGLB: "Exporter .GLB",
      exportUSDZ: "Exporter .USDZ"
    },
    landing: {
      enter: "ENTRER DANS LE STUDIO"
    }
  },
  en: {
    header: {
      title: "8 VIEW AI",
      import: "IMPORT",
      export: "Export",
      saveComposite: "Studio Sheet",
      saveLayers: "ZIP (Separate Views)",
      save3D: "3D Model",
      renameTitle: "Asset Name",
      renamePlaceholder: "Asset Name",
      downloadZip: "Export ZIP",
      cancel: "Cancel"
    },
    sidebar: {
      executionList: "Studio Gallery",
      emptyHistory: "No renders generated",
      legal: "Legal & Privacy"
    },
    info: {
      noSelection: "Select an Asset for analysis",
      statusMap: {
        'Complété': 'Studio Ready',
        'En cours': 'AI Processing...',
        'Échoué': 'Critical Error',
        'Brouillon': 'Draft'
      },
      format: "Format", engine: "Engine", dimensions: "Resolution", size: "Weight", type: "Type", date: "Gen Date"
    },
    app: {
      singleSource: "Single Photo Mode",
      quadView: "Manual Assembly",
      expertMode: "EXPERT MODE (Multi-Photos)",
      reconstruct3D: "3D Viewer",
      compare: "Compare",
      exploreViews: "Explore Views",
      compositeSheet: "Composite Sheet",
      exit: "Exit",
      source: "SOURCE",
      studio: "STUDIO AI",
      exportGLB: "Export .GLB",
      exportUSDZ: "Export .USDZ"
    },
    landing: {
      enter: "ENTER THE STUDIO"
    }
  },
  es: {
    header: {
      title: "8 VIEW AI",
      import: "IMPORTAR",
      export: "Exportar",
      saveComposite: "Hoja de Estudio",
      saveLayers: "ZIP (Vistas separadas)",
      save3D: "Modelo 3D",
      renameTitle: "Nombre del Activo",
      renamePlaceholder: "Nombre del Activo",
      downloadZip: "Exportar ZIP",
      cancel: "Cancelar"
    },
    sidebar: {
      executionList: "Galería de Estudio",
      emptyHistory: "No hay renders",
      legal: "Aviso Legal"
    },
    info: {
      noSelection: "Seleccione un Activo",
      statusMap: {
        'Complété': 'Estudio Listo',
        'En cours': 'Generando IA...',
        'Échoué': 'Error Crítico',
        'Brouillon': 'Borrador'
      },
      format: "Formato", engine: "Motor", dimensions: "Resolución", size: "Peso", type: "Tipo", date: "Fecha"
    },
    app: {
      singleSource: "Modo Foto Única",
      quadView: "Ensamblaje Manual",
      expertMode: "MODO EXPERTO (Multi-Fotos)",
      reconstruct3D: "Visor 3D",
      compare: "Comparar",
      exploreViews: "Explorar Vistas",
      compositeSheet: "Hoja Compuesta",
      exit: "Salir",
      source: "FUENTE",
      studio: "ESTUDIO IA",
      exportGLB: "Exportar .GLB",
      exportUSDZ: "Exportar .USDZ"
    },
    landing: {
      enter: "ENTRAR AL ESTUDIO"
    }
  },
  pt: {
    header: {
      title: "8 VIEW AI",
      import: "IMPORTAR",
      export: "Exportar",
      saveComposite: "Folha de Estúdio",
      saveLayers: "ZIP (Vistas separadas)",
      save3D: "Modelo 3D",
      renameTitle: "Nome do Ativo",
      renamePlaceholder: "Nome do Ativo",
      downloadZip: "Exportar ZIP",
      cancel: "Cancelar"
    },
    sidebar: {
      executionList: "Galeria de Estúdio",
      emptyHistory: "Nenhum render",
      legal: "Aviso Legal"
    },
    info: {
      noSelection: "Selecione um Ativo",
      statusMap: {
        'Complété': 'Estúdio Pronto',
        'En cours': 'Gerando IA...',
        'Échoué': 'Erro Crítico',
        'Brouillon': 'Rascunho'
      },
      format: "Formato", engine: "Motor", dimensions: "Resolução", size: "Peso", type: "Tipo", date: "Data"
    },
    app: {
      singleSource: "Modo Foto Única",
      quadView: "Montagem Manual",
      expertMode: "MODO ESPECIALISTA (Multi-Fotos)",
      reconstruct3D: "Visualizador 3D",
      compare: "Comparar",
      exploreViews: "Explorar Vistas",
      compositeSheet: "Folha Composta",
      exit: "Sair",
      source: "FONTE",
      studio: "ESTÚDIO IA",
      exportGLB: "Exportar .GLB",
      exportUSDZ: "Exportar .USDZ"
    },
    landing: {
      enter: "ENTRAR NO ESTÚDIO"
    }
  },
  it: {
    header: {
      title: "8 VIEW AI",
      import: "IMPORTA",
      export: "Esporta",
      saveComposite: "Foglio Studio",
      saveLayers: "ZIP (Viste separate)",
      save3D: "Modello 3D",
      renameTitle: "Nome Asset",
      renamePlaceholder: "Nome Asset",
      downloadZip: "Esporta ZIP",
      cancel: "Annulla"
    },
    sidebar: {
      executionList: "Galleria Studio",
      emptyHistory: "Nessun render",
      legal: "Note Legali"
    },
    info: {
      noSelection: "Seleziona un Asset",
      statusMap: {
        'Complété': 'Studio Pronto',
        'En cours': 'Generazione IA...',
        'Échoué': 'Errore Critico',
        'Brouillon': 'Bozza'
      },
      format: "Formato", engine: "Motore", dimensions: "Risoluzione", size: "Peso", type: "Tipo", date: "Data"
    },
    app: {
      singleSource: "Modalità Foto Singola",
      quadView: "Assemblaggio Manuale",
      expertMode: "MODALITÀ ESPERTO (Multi-Foto)",
      reconstruct3D: "Visualizzatore 3D",
      compare: "Confronta",
      exploreViews: "Esplora Viste",
      compositeSheet: "Foglio Composito",
      exit: "Esci",
      source: "FONTE",
      studio: "STUDIO IA",
      exportGLB: "Esporta .GLB",
      exportUSDZ: "Esporta .USDZ"
    },
    landing: {
      enter: "ENTRA NELLO STUDIO"
    }
  },
  hi: {
    header: {
      title: "8 VIEW AI",
      import: "आयात",
      export: "निर्यात",
      saveComposite: "स्टूडियो शीट",
      saveLayers: "ZIP (अलग दृश्य)",
      save3D: "3D मॉडल",
      renameTitle: "एसेट का नाम",
      renamePlaceholder: "एसेट का नाम",
      downloadZip: "ZIP निर्यात करें",
      cancel: "रद्द करें"
    },
    sidebar: {
      executionList: "स्टूडियो गैलरी",
      emptyHistory: "कोई रेंडर नहीं",
      legal: "कानूनी जानकारी"
    },
    info: {
      noSelection: "विश्लेषण के लिए एसेट चुनें",
      statusMap: {
        'Complété': 'स्टूडियो तैयार',
        'En cours': 'AI जनरेट कर रहा है...',
        'Échoué': 'गंभीर त्रुटि',
        'Brouillon': 'ड्राफ्ट'
      },
      format: "प्रारूप", engine: "इंजन", dimensions: "रिज़ॉल्यूशन", size: "आकार", type: "प्रकार", date: "तारीख"
    },
    app: {
      singleSource: "सिंगल फोटो मोड",
      quadView: "मैनुअल असेंबली",
      expertMode: "विशेषज्ञ मोड (मल्टी-फोटो)",
      reconstruct3D: "3D व्यूअर",
      compare: "तुलना करें",
      exploreViews: "दृश्य एक्सप्लोर करें",
      compositeSheet: "कम्पोजिट शीट",
      exit: "बाहर निकलें",
      source: "स्रोत",
      studio: "स्टूडियो AI",
      exportGLB: ".GLB निर्यात करें",
      exportUSDZ: ".USDZ निर्यात करें"
    },
    landing: {
      enter: "स्टूडियो में प्रवेश करें"
    }
  },
  ja: {
    header: {
      title: "8 VIEW AI",
      import: "インポート",
      export: "エクスポート",
      saveComposite: "スタジオシート",
      saveLayers: "ZIP (個別ビュー)",
      save3D: "3Dモデル",
      renameTitle: "アセット名",
      renamePlaceholder: "アセット名",
      downloadZip: "ZIPエクスポート",
      cancel: "キャンセル"
    },
    sidebar: {
      executionList: "スタジオギャラリー",
      emptyHistory: "レンダリングなし",
      legal: "法的情報"
    },
    info: {
      noSelection: "アセットを選択してください",
      statusMap: {
        'Complété': 'スタジオ準備完了',
        'En cours': 'AI生成中...',
        'Échoué': '致命的なエラー',
        'Brouillon': '下書き'
      },
      format: "フォーマット", engine: "エンジン", dimensions: "解像度", size: "サイズ", type: "タイプ", date: "日付"
    },
    app: {
      singleSource: "シングルフォトモード",
      quadView: "手動アセンブリ",
      expertMode: "エキスパートモード (マルチ写真)",
      reconstruct3D: "3Dビューア",
      compare: "比較",
      exploreViews: "ビューを探索",
      compositeSheet: "コンポジットシート",
      exit: "終了",
      source: "ソース",
      studio: "スタジオAI",
      exportGLB: ".GLBエクスポート",
      exportUSDZ: ".USDZエクスポート"
    },
    landing: {
      enter: "スタジオに入る"
    }
  },
  ar: {
    header: {
      title: "8 VIEW AI",
      import: "استيراد",
      export: "تصدير",
      saveComposite: "ورقة الاستوديو",
      saveLayers: "ZIP (عروض منفصلة)",
      save3D: "نموذج 3D",
      renameTitle: "اسم الأصل",
      renamePlaceholder: "اسم الأصل",
      downloadZip: "تصدير ZIP",
      cancel: "إلغاء"
    },
    sidebar: {
      executionList: "معرض الاستوديو",
      emptyHistory: "لا توجد تصاميم",
      legal: "معلومات قانونية"
    },
    info: {
      noSelection: "حدد أصلاً للتحليل",
      statusMap: {
        'Complété': 'جاهز للاستوديو',
        'En cours': 'جاري التوليد بالذكاء الاصطناعي...',
        'Échoué': 'خطأ فادح',
        'Brouillon': 'مسودة'
      },
      format: "تنسيق", engine: "محرك", dimensions: "دقة", size: "حجم", type: "نوع", date: "تاريخ"
    },
    app: {
      singleSource: "وضع الصورة الواحدة",
      quadView: "تجميع يدوي",
      expertMode: "وضع الخبير (صور متعددة)",
      reconstruct3D: "عارض 3D",
      compare: "مقارنة",
      exploreViews: "استكشاف العروض",
      compositeSheet: "ورقة مركبة",
      exit: "خروج",
      source: "المصدر",
      studio: "استوديو الذكاء الاصطناعي",
      exportGLB: "تصدير .GLB",
      exportUSDZ: "تصدير .USDZ"
    },
    landing: {
      enter: "دخول الاستوديو"
    }
  },
  zh: {
    header: {
      title: "8 VIEW AI",
      import: "导入",
      export: "导出",
      saveComposite: "工作室图纸",
      saveLayers: "ZIP (分离视图)",
      save3D: "3D模型",
      renameTitle: "资产名称",
      renamePlaceholder: "资产名称",
      downloadZip: "导出ZIP",
      cancel: "取消"
    },
    sidebar: {
      executionList: "工作室画廊",
      emptyHistory: "没有生成渲染",
      legal: "法律信息"
    },
    info: {
      noSelection: "选择一个资产进行分析",
      statusMap: {
        'Complété': '工作室准备就绪',
        'En cours': 'AI生成中...',
        'Échoué': '严重错误',
        'Brouillon': '草稿'
      },
      format: "格式", engine: "引擎", dimensions: "分辨率", size: "大小", type: "类型", date: "日期"
    },
    app: {
      singleSource: "单照片模式",
      quadView: "手动组装",
      expertMode: "专家模式 (多照片)",
      reconstruct3D: "3D查看器",
      compare: "比较",
      exploreViews: "探索视图",
      compositeSheet: "复合图纸",
      exit: "退出",
      source: "来源",
      studio: "工作室AI",
      exportGLB: "导出.GLB",
      exportUSDZ: "导出.USDZ"
    },
    landing: {
      enter: "进入工作室"
    }
  }
};
