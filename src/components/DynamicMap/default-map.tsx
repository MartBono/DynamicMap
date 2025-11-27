"use client";

import maplibregl from "maplibre-gl";
import { useState } from "react";

import "./dynamic-map.css";
import { Map } from "./map";
import { OverlayStyle } from "./style-specification-types";

interface DefaultMapProps {
  overlays: OverlayStyle[];
}

export function TestMap({ overlays }: DefaultMapProps) {
  const [map, setMap] = useState<maplibregl.Map | null>(null);

  return (
    <div className="h-screen w-screen">
      <Map
        overlays={overlays}
        center={[5.0, 52.0]}
        zoom={8}
        map={map}
        setMap={setMap}
      />
    </div>
  );
}
