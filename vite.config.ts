import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    BASE_URL: JSON.stringify('http://dapi.hapigan.ir:49155/')
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
  }
})
