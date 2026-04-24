import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/detect': {
        target: 'http://localhost:8000',
        changeOrigin: true
      },
      '/community': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  },
  preview: {
    allowedHosts: true
  }
})
