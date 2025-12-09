import { useState } from "react";
import { DefaultMap } from "../components/DynamicMap/default-map";
import ColorfulStyle from "../components/DynamicMap/overlayStyle/colorful";
import BgtStyle from "../components/DynamicMap/overlayStyle/bgt";
import CartoStyle from "../components/DynamicMap/overlayStyle/carto";
import PdokStyle from "../components/DynamicMap/overlayStyle/pdok";
import DkkStyle from "../components/DynamicMap/overlayStyle/dkk";
import { OverlayStyle } from "../components/DynamicMap/style-specification-types";

const availableOverlays = [
  { name: "Colorful", style: ColorfulStyle },
  { name: "BGT", style: BgtStyle },
  { name: "Carto", style: CartoStyle },
  { name: "PDOK", style: PdokStyle },
  { name: "DKK", style: DkkStyle },
];

function App() {
  const [activeOverlays, setActiveOverlays] = useState<OverlayStyle[]>([
    ColorfulStyle,
  ]);

  const toggleOverlay = (style: OverlayStyle) => {
    setActiveOverlays((prev) => {
      const isActive = prev.some((o) => o.id === style.id);
      if (isActive) {
        return prev.filter((o) => o.id !== style.id);
      } else {
        return [...prev, style];
      }
    });
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <DefaultMap overlays={activeOverlays} />
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          background: "white",
          padding: "10px",
        }}
      >
        <h3 style={{ margin: "0 0 10px 0", fontSize: "14px" }}>Overlays</h3>
        {availableOverlays.map(({ name, style }) => (
          <label
            key={style.id}
            style={{ display: "block", marginBottom: "5px", cursor: "pointer" }}
          >
            <input
              type="checkbox"
              checked={activeOverlays.some((o) => o.id === style.id)}
              onChange={() => toggleOverlay(style)}
              style={{ marginRight: "5px" }}
            />
            {name}
          </label>
        ))}
      </div>
    </div>
  );
}

export default App;
