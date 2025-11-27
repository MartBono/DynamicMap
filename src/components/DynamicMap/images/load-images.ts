// Simple arrow icon as SVG data URL
const arrowSvg = `data:image/svg+xml;base64,${btoa(`
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l7 10h-4v10h-6V12H5l7-10z" fill="currentColor"/>
  </svg>
`)}`;

// Simple triangle icon as SVG data URL
const triangleSvg = `data:image/svg+xml;base64,${btoa(`
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l10 17H2L12 2z" fill="currentColor"/>
  </svg>
`)}`;

export const loadArrowIcon = async (map: maplibregl.Map) => {
  await loadImage(map, arrowSvg, "arrow-icon");
};

export const loadTriangleIcon = async (map: maplibregl.Map) => {
  await loadImage(map, triangleSvg, "triangle-icon");
};

export const loadImage = async (
  map: maplibregl.Map,
  src: string,
  id: string,
) => {
  if (!map.hasImage(id)) {
    const imageResponse = await map.loadImage(src);
    const image = imageResponse.data;
    map.addImage(id, image);
  }
};
