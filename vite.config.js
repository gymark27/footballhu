import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    // Az /api hivasokat a Cloudflare Workerhez tovabbitja.
    // Igy a kodban eleg a relativ ut: fetch("/api/boots")
    proxy: {
      '/api': 'http://127.0.0.1:8787',
    },
  },
})
