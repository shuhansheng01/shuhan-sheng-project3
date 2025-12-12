import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // 这里的 proxy 设定非常关键
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // 这里必须和你 server.js 里的端口一致
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
