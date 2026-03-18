
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
  }
};
