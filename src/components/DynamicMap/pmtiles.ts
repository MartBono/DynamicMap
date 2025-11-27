import { addProtocol } from "maplibre-gl";
import { PMTiles, Protocol } from "pmtiles";

import { SourceSpecificationVector } from "./style-specification-types";

export const enablePmTiles = (
  map: maplibregl.Map,
  source: SourceSpecificationVector,
) => {
  if (!map) throw new Error("Map is not initialized");
  if (!source.baseUrl || source.vector !== "pmtiles") {
    throw new Error("Invalid PMTiles source");
  }

  const protocol = new Protocol();
  addProtocol("pmtiles", protocol.tile);
  const p = new PMTiles(source.baseUrl);
  protocol.add(p);
};
