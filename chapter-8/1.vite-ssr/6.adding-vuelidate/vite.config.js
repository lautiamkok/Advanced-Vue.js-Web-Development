import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default {
  plugins: [
    vue(),
    Pages(),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      // relative paths to the directory to search for components.
      dirs: ['src/components'],

      // search for subdirectories
      deep: true,

      // Allow subdirectories as namespace prefix for components.
      directoryAsNamespace: true,
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/head'
      ],
    }),
  ],

  // Vite does not support alias in html files.
  // https://github.com/vitejs/vite/issues/3000
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
}
