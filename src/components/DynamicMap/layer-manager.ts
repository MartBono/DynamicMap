import deepEqual from "fast-deep-equal";
import maplibregl from "maplibre-gl";

import { OverlayStyle } from "./style-specification-types";

/**
 * Find the layer id to insert the overlay before based on the order of the overlay
 * This is used to know where to insert the overlay in the map
 *
 * @param map - The MapLibre GL JS map instance
 * @param overlays - Array of all current overlays
 * @param order - The order value of the overlay being inserted
 * @returns The ID of the layer to insert before, or undefined if it should be added at the top
 */
export const findLayerInsertionIndex = (
  map: maplibregl.Map,
  overlays: OverlayStyle[],
  order: number,
): string | undefined => {
  const mapLayers = map.getStyle().layers || [];

  const higherOrderOverlays = overlays
    .filter((o) => o.order > order)
    .sort((a, b) => a.order - b.order);

  for (const overlay of higherOrderOverlays) {
    if (!overlay.layers || overlay.layers.length === 0) continue;

    const firstLayerId = overlay.layers[0].id;
    if (mapLayers.some((layer) => layer.id === firstLayerId)) {
      return firstLayerId;
    }
  }

  // returns undefined if it is the first overlay
  return undefined;
};

/**
 * Add the overlay to the map making sure to not add the source if it is already added by another overlay
 *
 * @param map - The MapLibre GL JS map instance
 * @param overlays - Array of all current overlays
 * @param overlay - The overlay to add to the map
 */
export const addOverlayToMap = (
  map: maplibregl.Map,
  overlays: OverlayStyle[],
  overlay: OverlayStyle,
): void => {
  if (overlay.sources) {
    Object.entries(overlay.sources).forEach(([sourceId, source]) => {
      try {
        if (map.getSource(sourceId)) {
          const sourceUsedByThisOverlay =
            overlay.layers?.some(
              (l) => "source" in l && l.source === sourceId,
            ) || false;

          if (sourceUsedByThisOverlay) {
            overlay.layers?.forEach((layer) => {
              if (
                "source" in layer &&
                layer.source === sourceId &&
                map.getLayer(layer.id)
              ) {
                map.removeLayer(layer.id);
              }
            });
          } else {
            return;
          }
        } else {
          map.addSource(sourceId, source);
        }
      } catch (error) {
        console.error(`Error with source ${sourceId}:`, error);
      }
    });
  }

  const beforeLayerId = findLayerInsertionIndex(map, overlays, overlay.order);

  if (overlay.layers) {
    overlay.layers.forEach((layer) => {
      try {
        if (map.getLayer(layer.id)) {
          map.removeLayer(layer.id);
        }

        if ("source" in layer && layer.source && !map.getSource(layer.source))
          return;

        if (beforeLayerId) {
          map.addLayer(layer, beforeLayerId);
        } else {
          map.addLayer(layer);
        }
      } catch (error) {
        console.error(`Error with layer ${layer.id}:`, error);
      }
    });
  }
};

/**
 * Remove the overlay from the map making sure to not remove the source if it is used by another overlay
 *
 * @param map - The MapLibre GL JS map instance
 * @param overlays - Array of all current overlays
 * @param overlay - The overlay to remove from the map
 */
export const removeOverlayFromMap = (
  map: maplibregl.Map,
  overlays: OverlayStyle[],
  overlay: OverlayStyle,
): void => {
  if (overlay.layers) {
    overlay.layers.forEach((layer) => {
      try {
        if (map.getLayer(layer.id)) {
          map.removeLayer(layer.id);
        }
      } catch (err) {
        console.error(`Error removing layer ${layer.id}:`, err);
      }
    });
  }

  if (overlay.sources && overlay.removeSourceAfterRemove) {
    Object.keys(overlay.sources).forEach((sourceId) => {
      try {
        const isSourceUsedElsewhere = overlays.some(
          (o) => o.id !== overlay.id && o.sources && sourceId in o.sources,
        );

        if (!isSourceUsedElsewhere && map.getSource(sourceId)) {
          map.removeSource(sourceId);
        }
      } catch (err) {
        console.error(`Error removing source ${sourceId}:`, err);
      }
    });
  }
};

/**
 * Return the overlays that are added to the active overlays
 *
 * @param activeOverlays - Array of currently active overlays
 * @param overlays - Array of requested overlays
 * @returns Array of overlays that need to be added
 */
export const getAddedOverlays = (
  activeOverlays: OverlayStyle[],
  overlays: OverlayStyle[],
): OverlayStyle[] => {
  return overlays.filter((o) => !activeOverlays.some((ao) => ao.id === o.id));
};

/**
 * Return the overlays that are removed from the active overlays
 *
 * @param activeOverlays - Array of currently active overlays
 * @param overlays - Array of requested overlays
 * @returns Array of overlays that need to be removed
 */
export const getRemovedOverlays = (
  activeOverlays: OverlayStyle[],
  overlays: OverlayStyle[],
): OverlayStyle[] => {
  return activeOverlays.filter((ao) => !overlays.some((o) => o.id === ao.id));
};

/**
 * Return the overlays that are changed from the active overlays
 * Used for example in changing overlay geometry or style
 *
 * @param activeOverlays - Array of currently active overlays
 * @param overlays - Array of requested overlays
 * @returns Array of overlays that need to be changed
 */
export const getChangedOverlays = (
  activeOverlays: OverlayStyle[],
  overlays: OverlayStyle[],
): OverlayStyle[] => {
  return overlays.filter((o) => {
    const activeOverlay = activeOverlays.find((ao) => ao.id === o.id);
    if (!activeOverlay) return false;

    return (
      activeOverlay.order !== o.order ||
      !deepEqual(activeOverlay.sources, o.sources) ||
      !deepEqual(activeOverlay.layers, o.layers)
    );
  });
};
