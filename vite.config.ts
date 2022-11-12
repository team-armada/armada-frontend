import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    target: 'esnext',
  },
  define: {
    global: {},
  },
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser', //fix production build
    },
  },
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
