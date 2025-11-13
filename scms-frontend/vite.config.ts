import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path' // 1. Import 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: { // 2. Thêm phần 'resolve' này
    alias: {
      '@': path.resolve(__dirname, './src'), // Định nghĩa @ trỏ về src
    },
  },
})