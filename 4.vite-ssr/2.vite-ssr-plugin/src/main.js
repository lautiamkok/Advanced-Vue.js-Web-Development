'use strict'

// Import styles.
import '@/styles'

// Create the vue app here to be shared between server and client.
import viteSSR from 'vite-ssr'
import { createHead } from '@vueuse/head'
import App from '@/App.vue'
import routes from '~pages'
import AutoImportComponents from '@/plugins/auto-import/components'
import AutoImportComposables from '@/plugins/auto-import/composables'

// https://github.com/frandiox/vite-ssr
export default viteSSR (App, 
  { 
    routes 
  }, 
  ({ url, app, router, initialState, request, isClient, writeResponse, redirect }) => {
    const head = createHead()

    app.use(AutoImportComponents)
    app.use(AutoImportComposables)
    app.use(head)

    // Handle errors at the app level - final level. Handle errors that come from
    // anywhere in the app, such as the error occurs in `pages`, `components`,
    // and `composables` directories, etc, that are not caught in the `try-catch`
    // block.
    app.config.errorHandler = async (err, vm, info) => {
      console.log('status caught at the app level: ', err.status)
      console.log('message caught at the app level: ', err.message)
      console.log('stack caught at the app level: ', err.stack)
    }

    // https://github.com/frandiox/vite-ssr#head-tags-and-global-attributes
    return { head }
  }
)
