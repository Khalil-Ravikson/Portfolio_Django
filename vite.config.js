import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Build Vite para Django + React + TS
export default defineConfig({
  plugins: [react()],
  
  // Define a raiz dos arquivos frontend
  root: 'static',

  base: '/static/',  // URL base para produção (STATIC_URL do Django)

  build: {
    // Saída relativa à root
    outDir: '../staticfiles/dist',
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      // Entrypoint principal do seu React
      input: resolve(__dirname, 'static/js/main.ts'), 
    },
    // Evita criar chunks com paths relativos/absolutos inválidos
    assetsDir: 'assets', 
  },

  server: {
    port: 5173,
    cors: true,
  },
});
