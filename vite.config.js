import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  root: 'static',            // raiz dos arquivos frontend
  base: '/static/',
  build: {
    outDir: '../staticfiles/dist', // saída relativa à root
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: resolve(__dirname, 'static/js/main.ts'), // seu entrypoint
    },
  },
})
