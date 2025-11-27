import {
  SourceSpecification,
  StyleSpecification,
  VectorSourceSpecification,
} from "maplibre-gl";

export interface BaseStyle extends StyleSpecification {
  id: string;
}

export interface SourceSpecificationVector extends VectorSourceSpecification {
  vector: string;
  baseUrl: string;
}

export interface OverlayStyle extends Pick<StyleSpecification, "layers"> {
  id: string;
  order: number;
  removeSourceAfterRemove?: boolean;
  sources: {
    [_: string]: SourceSpecificationVector | SourceSpecification;
  };
}
