
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// Deployment trigger
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      'figma:asset/3ce6d60c8f95ee9461d1c6abe596da515e9a5a56.png': path.resolve(__dirname, './src/assets/3ce6d60c8f95ee9461d1c6abe596da515e9a5a56.png'),
      '@': path.resolve(__dirname, './src'),

    },
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
  },
  server: {
    port: 3000,
    open: true,
  },
});