import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        secure: false,
      }
    },
  },
  build: {
    rollupOptions: {
      external: ['mysql', 'oracle', 'pg', 'sqlite3'],
    },
  },
  plugins: [react()],
  
});
