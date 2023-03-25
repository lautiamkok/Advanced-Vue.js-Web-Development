import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import Unimport from 'unimport/unplugin'
import Pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    // https://github.com/unjs/unimport
    Unimport.vite({
      presets: [
        'vue',
        'vue-router'
      ],

      dirs: [
        './src/composables/**'
      ]
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages()
  ],

  // Note that Vite does not support alias in html files.
  // https://github.com/vitejs/vite/issues/3000
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
