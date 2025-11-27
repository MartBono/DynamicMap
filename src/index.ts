// Import CSS styles
import './index.css';

export { Map as DynamicMap } from './components/DynamicMap/map';

// Export overlay styles
export { default as BgtStyle } from './components/DynamicMap/overlayStyle/bgt';
export { default as CartoStyle } from './components/DynamicMap/overlayStyle/carto';
export { default as ColorfulStyle } from './components/DynamicMap/overlayStyle/colorful';
export { default as DkkStyle } from './components/DynamicMap/overlayStyle/dkk';
export { default as PdokStyle } from './components/DynamicMap/overlayStyle/pdok';

// Export base styles
export { default as DefaultBase } from './components/DynamicMap/baseStyle/default-base';

// Export utility functions
export { enablePmTiles } from './components/DynamicMap/pmtiles';
export { 
  addOverlayToMap, 
  removeOverlayFromMap, 
  getAddedOverlays, 
  getRemovedOverlays, 
  getChangedOverlays 
} from './components/DynamicMap/layer-manager';
export { loadArrowIcon, loadTriangleIcon, loadImage } from './components/DynamicMap/images/load-images';

// Export types
export type { OverlayStyle, BaseStyle, SourceSpecificationVector } from './components/DynamicMap/style-specification-types';