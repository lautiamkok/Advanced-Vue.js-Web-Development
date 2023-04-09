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
import useCart from '@/composables/use-cart'

// https://nodejs.bootcss.com/node-request-data/
async function normalizeBody (req) {
  let body = []
  const requestMethods = ['PATCH', 'POST', 'PUT', 'DELETE']
  if (requestMethods.includes(req.method)) {
    for await (const chunk of req) {
      body += chunk
    }

    if (req.headers['content-type']?.includes('application/json')) {
      body = JSON.parse(body)
    }
  }

  return body
}

async function bootstrap (req) {
  const { items } = useCart()
  if (import.meta.env.SSR) {
    // Don't process if no `content-type` in the header.
    if (!req.headers['content-type']) {
      return
    }
    items.value = await normalizeBody(req)
  } else {
    const cart = localStorage.getItem("cart")
    items.value =  JSON.parse(cart)
  }
}

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

  // Populate cart's items on the server and client sides.
  bootstrap(req)

  return { app, router, head }
}
