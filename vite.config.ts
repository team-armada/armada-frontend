import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: {},
  },

  server: {
    host: true,
    proxy: {
      '/cohort': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/course': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/service': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/template': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/user': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
