import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
},
  plugins: [react(), eslint()],
}));
