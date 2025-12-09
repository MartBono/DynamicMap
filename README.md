# Dynamic Map

A React library for declarative overlay management with MapLibre GL. Simplifies the complexity of dynamically adding, removing, and updating map layers.

## Quick Start

```tsx
import { DynamicMap } from 'dynamic-map';
import 'dynamic-map/style.css';
import { useState } from 'react';

function App() {
  const [map, setMap] = useState(null);
  
  const geojsonOverlay = {
    id: 'points',
    order: 1,
    sources: {
      'my-points': {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [...] }
      }
    },
    layers: [
      {
        id: 'points-circle',
        type: 'circle',
        source: 'my-points',
        paint: { 'circle-radius': 8, 'circle-color': '#ff0000' }
      }
    ]
  };

  return (
    <DynamicMap 
      overlays={[geojsonOverlay]}
      map={map}
      setMap={setMap}
      center={[4.9, 52.3]}
      zoom={8}
    />
  );
}

## Development

```bash
# Install dependencies
npm install

# Start Storybook
npm run storybook

# Build the library
npm run build

# Run tests
npm test
```

## Building and Packaging

```bash
# Build the library
npm run build

# Create a .tgz tarball
npm pack

# Publish to npm (after bumping version)
npm publish
```
