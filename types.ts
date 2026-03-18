
export interface WorkflowImage {
  id: number;
  name: string;
  type: 'render' | 'texture' | 'mesh' | 'multi-view';
  originalUrl: string;
  resultUrl: string;
  dimensions: string;
  size: string;
  format: string;
  date: string;
  status: 'Complété' | 'En cours' | 'Échoué' | 'Brouillon';
}

export type PipelineStep = 'idle' | 'segmentation' | 'geometry' | 'pbr' | 'rendering' | 'meshing' | 'complete';

export interface ViewerState {
  currentImageId: number;
  isComparisonMode: boolean;
  is3DView: boolean;
  zoomLevel: number;
  isLoading: boolean;
  isFullscreen: boolean;
  pipelineStep: PipelineStep;
}
