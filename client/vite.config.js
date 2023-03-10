import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { dependencies } from './package.json';

function renderChunks(deps) {
  const chunks = {};
  Object.keys(deps).forEach((key) => {
    if (['react', 'react-router-dom', 'react-dom'].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-router-dom', 'react-dom'],
          ...renderChunks(dependencies),
        },
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
    },
  },
  plugins: [react()],
});
