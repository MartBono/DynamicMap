import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig(({ command, mode }) => {
  const isLibraryBuild = mode === 'production' || process.env.LIB_BUILD === 'true';
  
  if (isLibraryBuild) {
    // Library build configuration
    return {
      plugins: [
        react(),
        dts({
          insertTypesEntry: true,
          exclude: ['src/demo/**/*']
        }),
      ],
      resolve: {
        alias: {
          '@': resolve(__dirname, './src'),
        },
      },
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'DynamicMap',
          formats: ['es', 'umd'],
          fileName: (format) => `dynamic-map.${format}.js`,
        },
        rollupOptions: {
          external: ['react', 'react-dom', 'maplibre-gl', 'pmtiles'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
              'maplibre-gl': 'maplibregl',
              'pmtiles': 'pmtiles',
            },
          },
        },
      },
    };
  } else {
    // Development/demo configuration
    return {
      plugins: [react()],
      resolve: {
        alias: {
          '@': resolve(__dirname, './src'),
        },
      },
      server: {
        port: 3000,
        open: true
      }
    };
  }
});