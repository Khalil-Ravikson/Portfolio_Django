import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Pasta raiz do frontend
  root: 'static',

  build: {
    // Saída: vai gerar JS/CSS dentro de "static/dist"
    outDir: './dist',
    emptyOutDir: true,

    // 🔧 Gera o manifest.json um nível acima (em static/)
    manifest: '../manifest.json',

    rollupOptions: {
      // Ponto de entrada principal (ajuste se seu arquivo for outro)
      input: resolve(__dirname, 'static/js/main.ts'),
    },
  },

  server: {
    port: 5173,
    cors: true,
  },
});
