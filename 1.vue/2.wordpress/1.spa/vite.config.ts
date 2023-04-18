import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import Unimport from 'unimport/unplugin'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),

    // https://github.com/unjs/unimport
    Unimport.vite({
      presets: [
        'vue'
      ],

      dirs: [
        './src/composables/**',
        './src/utils/**'
      ]
    }),
  ],

  // Note that Vite does not support alias in html files.
  // https://github.com/vitejs/vite/issues/3000
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler',
      '@': resolve(__dirname, './src'),
    },
  },
})
