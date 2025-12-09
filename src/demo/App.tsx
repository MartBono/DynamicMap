import { useEffect, useMemo, useState } from "react";
import { DefaultMap } from "../components/DynamicMap/default-map";
import ColorfulStyle from "../components/DynamicMap/overlayStyle/colorful";
import BgtStyle from "../components/DynamicMap/overlayStyle/bgt";
import CartoStyle from "../components/DynamicMap/overlayStyle/carto";
import PdokStyle from "../components/DynamicMap/overlayStyle/pdok";
import DkkStyle from "../components/DynamicMap/overlayStyle/dkk";
import { OverlayStyle } from "../components/DynamicMap/style-specification-types";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const generateRandomPoints = () => {
  const cities = [
    { name: "Amsterdam", coords: [4.9041, 52.3676] },
    { name: "Rotterdam", coords: [4.4777, 51.9244] },
    { name: "Utrecht", coords: [5.1214, 52.0907] },
    { name: "The Hague", coords: [4.3007, 52.0705] },
    { name: "Eindhoven", coords: [5.4697, 51.4416] },
    { name: "Groningen", coords: [6.5665, 53.2194] },
    { name: "Maastricht", coords: [5.6913, 50.8514] },
    { name: "Leiden", coords: [4.4811, 52.1601] },
  ];

  const startDate = new Date("2020-01-01").getTime();
  const endDate = new Date("2025-12-31").getTime();

  return {
    type: "FeatureCollection",
    features: cities.map((city) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: city.coords,
      },
      properties: {
        name: city.name,
        date: new Date(
          startDate + Math.random() * (endDate - startDate)
        ).toISOString(),
      },
    })),
  };
};

const pointsData = generateRandomPoints();

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

  const [sliderValue, setSliderValue] = useState<number>(
    new Date("2025-12-31").getTime()
  );

  const debouncedDate = useDebounce(sliderValue, 50);

  const minDate = new Date("2020-01-01").getTime();
  const maxDate = new Date("2025-12-31").getTime();
  const dateStep = (maxDate - minDate) / 100;

  const allPointDates = useMemo(
    () =>
      pointsData.features
        .map((f: any) => new Date(f.properties.date).getTime())
        .sort((a, b) => a - b),
    []
  );

  const currentCount = useMemo(() => {
    return allPointDates.filter((d) => d <= sliderValue).length;
  }, [sliderValue, allPointDates]);

  const pointsOverlay: OverlayStyle = useMemo(() => {
    const filteredData = {
      type: "FeatureCollection",
      features: pointsData.features.filter((feature: any) => {
        const featureDate = new Date(feature.properties.date).getTime();

        return featureDate <= debouncedDate;
      }),
    };

    return {
      id: "points",
      order: 100,
      removeSourceAfterRemove: true,
      sources: {
        points: {
          type: "geojson",
          data: filteredData as any,
        },
      },
      layers: [
        {
          id: "points-layer",
          type: "circle",
          source: "points",
          paint: {
            "circle-radius": 8,
            "circle-color": "#ff0000",
            "circle-stroke-width": 2,
            "circle-stroke-color": "#ffffff",
          },
        },
      ],
    };
  }, [debouncedDate]);

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

  const togglePoints = () => {
    setActiveOverlays((prev) => {
      const isActive = prev.some((o) => o.id === "points");
      if (isActive) {
        return prev.filter((o) => o.id !== "points");
      } else {
        return [...prev, pointsOverlay];
      }
    });
  };

  useEffect(() => {
    setActiveOverlays((prev) => {
      const hasPoints = prev.some((o) => o.id === "points");
      if (hasPoints) {
        return prev.map((o) => (o.id === "points" ? pointsOverlay : o));
      }
      return prev;
    });
  }, [pointsOverlay]);

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
          zIndex: 10,
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
        <label
          style={{ display: "block", marginBottom: "5px", cursor: "pointer" }}
        >
          <input
            type="checkbox"
            checked={activeOverlays.some((o) => o.id === "points")}
            onChange={togglePoints}
            style={{ marginRight: "5px" }}
          />
          Points
        </label>

        {activeOverlays.some((o) => o.id === "points") && (
          <div
            style={{
              marginTop: "10px",
              paddingTop: "10px",
              borderTop: "1px solid #ddd",
            }}
          >
            <h4 style={{ margin: "0 0 5px 0", fontSize: "12px" }}>
              Filter by Date
            </h4>
            <div style={{ fontSize: "11px", marginBottom: "5px" }}>
              {new Date(sliderValue).toLocaleDateString()} ({currentCount} /{" "}
              {pointsData.features.length} points)
            </div>
            <input
              type="range"
              min={minDate}
              max={maxDate}
              step={dateStep}
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              style={{ width: "100%" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
