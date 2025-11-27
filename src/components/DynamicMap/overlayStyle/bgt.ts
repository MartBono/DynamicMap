// @ts-nocheck
import { OverlayStyle } from "../map-style";

const BgtStyle: OverlayStyle = {
  id: "bgt",
  order: 11,
  sources: {
    bgt: {
      type: "raster",
      tiles: [
        "https://service.pdok.nl/lv/bgt/wmts/v1_0/omtrekgerichtevisualisatie/EPSG:3857/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
      attribution: "© PDOK",
    },
  },
  layers: [
    {
      id: "bgt-background",
      type: "raster",
      source: "bgt",
      paint: {
        "raster-opacity": 0.9,
        "raster-saturation": -1,
        "raster-contrast": 0.1,
        "raster-brightness-min": 0.7,
        "raster-brightness-max": 1,
      },
    },
  ],
};

export default BgtStyle;
