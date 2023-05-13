'use strict'

import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unimport from 'unimport/unplugin'
import Pages from 'vite-plugin-pages'

// https://vitejs.dev/guide/api-javascript.html#build
const __dirname = fileURLToPath(new URL('.', import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
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
        './src/utils/**',
        './src/api/**'
      ]
    })
  ],

  // Vite does not support alias in html files.
  // https://github.com/vitejs/vite/issues/3000
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },

  // Don't minify script as it does not work well with global components.
  build: {
    minify: false,
  }
})
