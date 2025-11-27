// @ts-nocheck
import { OverlayStyle } from "../style-specification-types";

const CartoStyle: OverlayStyle = {
  id: "carto",
  order: 1,
  // version: 8,
  // name: "OpenStreetMap Carto",
  // attribution: {
  //   name: "© OpenStreetMap contributors",
  //   url: "https://www.openstreetmap.org/copyright",
  // },
  // metadata: {
  //   "maputnik:renderer": "mbgljs",
  //   license: "https://creativecommons.org/publicdomain/zero/1.0/",
  // },
  // glyphs: "https://tiles.versatiles.org/assets/glyphs/{fontstack}/{range}.pbf",
  // sprite: "https://tiles.versatiles.org/assets/sprites/basics/sprites",
  // "text-color": "text-primary",
  sources: {
    "openstreetmap-carto": {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors",
      maxzoom: 19,
    },
  },
  layers: [
    {
      id: "carto-background",
      type: "raster",
      source: "openstreetmap-carto",
      paint: {
        "raster-opacity": 1,
      },
    },
  ],
};

export default CartoStyle;
