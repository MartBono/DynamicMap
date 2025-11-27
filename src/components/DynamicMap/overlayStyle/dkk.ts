// @ts-nocheck
import { OverlayStyle } from "../map-style";

const DkkStyle: OverlayStyle = {
  id: "dkk",
  order: 10,
  sources: {
    "dkk-wmts": {
      type: "raster",
      tiles: [
        // https://service.pdok.nl/kadaster/kadastralekaart/wmts/v5_0/Kadastralekaart_kwaliteitsvisualisatie/{TileMatrixSet}/{TileMatrix}/{TileCol}/{TileRow}.png
        "https://service.pdok.nl/kadaster/kadastralekaart/wmts/v5_0/Kadastralekaart/EPSG:3857/{z}/{x}/{y}.png",
        // "https://service.pdok.nl/kadaster/kadastralekaart/wmts/v5_0?request=GetCapabilities&amp;service=WMTS",
      ],
      tileSize: 256,
      attribution: "© PDOK",
    },
  },
  layers: [
    {
      id: "dkk-wmts-background",
      type: "raster",
      source: "dkk-wmts",
      paint: {
        "raster-opacity": 0.5,
      },
    },
  ],
};

export default DkkStyle;
