import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  // Define a raiz do projeto frontend como a pasta 'static'
  root: 'static',

  build: {
    // Onde os arquivos compilados serão salvos (dentro da pasta static)
    outDir: './dist',
    // Limpa a pasta 'dist' antes de cada build para evitar arquivos antigos
    emptyOutDir: true,
    // Gera um 'manifest.json' que mapeia os nomes dos arquivos originais para os compilados
    manifest: true,
    rollupOptions: {
      // Define qual arquivo TypeScript é o ponto de entrada principal
      input: '/js/main.ts',
    },
  },

  server: {
    // Porta padrão do servidor de desenvolvimento do Vite
    port: 5173,
    // Habilita CORS para que o servidor do Django (na porta 8000) possa acessar este
    cors: true,
  },
});