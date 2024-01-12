import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default {
  plugins: [
    vue(),
    WindiCSS()
  ],

  // Vite does not support alias in html files.
  // https://github.com/vitejs/vite/issues/3000
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler',
      '@': resolve(__dirname, './src')
    },
  },

  // Build multiple pages.
  // https://vitejs.dev/guide/build.html#multi-page-app
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about/index.html')
      }
    }
  }
}
