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

  // Build multiple pages.
  // https://vitejs.dev/guide/build.html#multi-page-app
  // build: {
  //   rollupOptions: {
  //     input: {
  //       main: resolve(__dirname, 'index.html'),
  //       error: resolve(__dirname, 'error.html')
  //     }
  //   }
  // }
}
