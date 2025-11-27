// @ts-nocheck
import { BaseStyle } from "../style-specification-types";

const DefaultBase: BaseStyle = {
  id: "default-base",
  version: 8,
  name: "Default Base",
  metadata: {
    "maputnik:renderer": "mbgljs",
    license: "https://creativecommons.org/publicdomain/zero/1.0/",
  },
  glyphs: "https://tiles.versatiles.org/assets/glyphs/{fontstack}/{range}.pbf",
  sprite: "https://tiles.versatiles.org/assets/sprites/basics/sprites",
  sources: {},
  layers: [],
};

export default DefaultBase;
