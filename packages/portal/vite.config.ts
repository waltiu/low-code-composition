import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias: {
      // 添加一个别名 "@components" 指向 "src/components" 目录
      '@': path.resolve(__dirname, 'src'),
      // 你可以根据需要继续添加更多别名
    },
  },
  plugins: [react()],
})
