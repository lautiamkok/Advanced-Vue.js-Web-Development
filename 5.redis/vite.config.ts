'use strict'

// https://vitejs.dev/config/
import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'
import Unimport from 'unimport/unplugin'

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    // vite config:
    server: {
      port: env.VITE_APP_PORT
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      },
    },
    plugins: [
      // https://github.com/axe-me/vite-plugin-node
      ...VitePluginNode({
        adapter: 'express',

        // Tell the plugin where is your project entry.
        appPath: './src/app.ts',
      }),

      // https://github.com/unjs/unimport
      Unimport.vite({
        dirs: [
          './src/composables/**',
          './src/utils/**'
        ]
      })
    ],
  }
})
