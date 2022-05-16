import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~antd': path.resolve(path.resolve(__dirname), 'node_modules/antd'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // '@primary-color': '#13c2c2',
        },
        javascriptEnabled: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          moment: ['moment'],
          antd: ['antd'],
        },
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/mock': {
        target: 'https://www.fastmock.site/mock/52b0db6a33ad956132f9f3f44be601dd/front',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mock/, ''),
      },
    },
  },
})
