import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Unimport from 'unimport/unplugin'
import viteSSR from 'vite-ssr/plugin.js'

// https://vitejs.dev/config/
export default {
  // https://vitejs.dev/config/server-options.html
  server: {
    port: 3000 // Default: 5173
  },
  plugins: [
    // https://github.com/frandiox/vite-ssr
    viteSSR(),
    
    vue(),
    Pages(),

    // https://github.com/unjs/unimport
    Unimport.vite({
      presets: [
        'vue',
        'vue-router',
        '@vueuse/head'
      ],

      dirs: [
        './src/composables/**',
        './src/utils/**'
      ]
    })
  ],

  // Vite does not support alias in html files.
  // https://github.com/vitejs/vite/issues/3000
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    },
  }
}
