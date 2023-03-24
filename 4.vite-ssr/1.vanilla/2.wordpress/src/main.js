'use strict'

// Import styles.
import '@/styles'

// Create the vue app here to be shared between server and client.
import App from '@/App.vue'
import Err from '@/Err.vue'
import { createSSRApp, useSSRContext } from 'vue'
import { createHead } from '@vueuse/head'
import { createRouter } from '@/router'
import AutoImportComponents from '@/plugins/auto-import/components'
import AutoImportComposables from '@/plugins/auto-import/composables'

export function createApp (req = null) {
  const isServerClearError = import.meta.env.SSR 
    && req.method === 'POST'
    && req.headers['x-clear-error']
  const component = isServerClearError ? Err : App
  const app = createSSRApp(component)
  const head = createHead()
  const router = createRouter()
  const { raw } = useError()

  app.use(AutoImportComponents)
  app.use(AutoImportComposables)
  app.use(head)
  app.use(router)

  // Handle errors at the app level - final level. Handle errors that come from
  // anywhere in the app, such as the error occurs in `pages`, `components`,
  // and `composables` directories, etc, that are not caught in the `try-catch`
  // block.
  app.config.errorHandler = (err, vm, info) => {
    // Un-comment to see the log.
    // console.log('status caught at the app level: ', err.status)
    // console.log('message caught at the app level: ', err.message)
    // console.log('stack caught at the app level: ', err.stack)

    err.final = true
    raw.value = err
  }

  return { app, router, head }
}
