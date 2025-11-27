// @ts-nocheck
import { OverlayStyle } from "../style-specification-types";

const PdokStyle: OverlayStyle = {
  id: "pdok",
  order: 0,
  sources: {
    "pdok-wms": {
      type: "raster",
      tiles: [
        "https://service.pdok.nl/hwh/luchtfotorgb/wms/v1_0?FORMAT=image/jpeg&VERSION=1.3.0&SERVICE=WMS&REQUEST=GetMap&LAYERS=Actueel_orthoHR&STYLES=&CRS=EPSG:3857&WIDTH=256&HEIGHT=256&BBOX={bbox-epsg-3857}",
      ],
      tileSize: 256,
      attribution: "© PDOK",
    },
  },
  layers: [
    {
      id: "pdok-background",
      type: "raster",
      source: "pdok-wms",
      paint: {
        "raster-opacity": 1,
      },
    },
    // {
    //   id: "pdok-background-overlay",
    //   type: "background",
    //   paint: {
    //     "background-color": "rgba(255, 255, 255, 0.5)",
    //   },
    // },
  ],
};

export default PdokStyle;
