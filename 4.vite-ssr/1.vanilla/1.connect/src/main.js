'use strict'

// Import styles.
import '@/styles'

// Create the vue app here to be shared between server and client.
import App from '@/App.vue'
import Void from '@/Void.vue'
import { createSSRApp, useSSRContext } from 'vue'
import { createHead } from '@vueuse/head'
import { createRouter } from '@/router'
import AutoImportComponents from '@/plugins/auto-import/components'
import AutoImportComposables from '@/plugins/auto-import/composables'
import useCart from '@/composables/use-cart'
import { normalizeBody } from '@/utils/utils'

async function bootstrap (req) {
  const { items } = useCart()
  const { error, normalizeError } = useError()
  if (import.meta.env.SSR) {
    // Don't process if no `content-type` in the header.
    if (!req.headers['content-type']) {
      return
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
    const url = req.url
    const string = url.substring(url.indexOf('?'))
    const params = new URLSearchParams(string)

    if (params.has('error') && params.get('error') === 'set') {
      error.value = await normalizeBody(req)
    }
    if (params.has('cart') && params.get('cart') === 'set') {
      items.value = await normalizeBody(req)
    }
    
  } else {
    const errorClient = window.context.error
    // Use `Object.keys` to make sure the error is not empty, or use `JSON.stringify`:
    // Object.keys(obj).length === 0 // true => empty
    // JSON.stringify(obj) === '{}' // true => empty
    if (window.context.error && JSON.stringify(errorClient) !== '{}') {
      error.value = errorClient
    }
    const id = import.meta.env.VITE_APP_CART_ID
    const cart = localStorage.getItem(id)
    items.value =  JSON.parse(cart) ?? []
  }
}

export function createApp (req = null) {
  const component = (req) => {
    const requestMethods = ['PATCH', 'POST', 'PUT', 'DELETE']
    if (import.meta.env.SSR && requestMethods.includes(req.method)) {
      return Void
    }
    return App
  }

  const app = createSSRApp(component(req))
  const head = createHead()
  const router = createRouter()
  const { error, normalizeError } = useError()

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
    
    // Normalize the error data from the original error object.
    const failure = normalizeError(err)
    error.value = failure

    if (!import.meta.env.SSR) {
      const appBaseUrl = import.meta.env.VITE_APP_BASE_URL
      const body = JSON.stringify(failure)

      fetch(`${appBaseUrl}?error=set`, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body
      })
    }
  }

  // Populate cart's items on the server and client sides.
  bootstrap(req)

  return { app, router, head }
}
