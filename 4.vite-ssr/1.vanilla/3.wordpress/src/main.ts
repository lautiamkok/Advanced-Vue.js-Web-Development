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

const appBaseUrl = import.meta.env.VITE_APP_BASE_URL
const { error } = useError()

async function ssrOperations (req, res) {
  // Don't process if no `content-type` in the header.
  if (!req.headers['content-type']) {
    return
  }

  // Don't process if it is not a POST request.
  if (!req.method === 'POST') {
    return
  }

  const url = req.url
  const string = url.substring(url.indexOf('?'))
  const params = new URLSearchParams(string)

  // 2. Set the error data on the server side.
  if (params.has('error') && params.get('error') === 'set') {
    error.value = await normalizeBody(req)
    return
  }

  // 3. Clear the error data on the server side.
  if (params.has('error') && params.get('error') === 'delete') {
    error.value = false
    console.log('Error cleared')
    return
  }
}

export async function createApp (req = null, res = null) {
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

  app.use(AutoImportComponents)
  app.use(AutoImportComposables)
  app.use(head)
  app.use(router)

  // SSR initial state and data fetching:
  // 2. Reset error on the server side.
  router.beforeEach(async (to, from) => {
    // Reset error on the server when the path that is different from the path has errors.
    if (import.meta.env.SSR && req.method === 'GET') {
      if (error.value.path !== to.path) {
        error.value = false
      }
    }
  })

  // Populate cart's items & error data on the server side.
  if (import.meta.env.SSR) {
    ssrOperations(req, res)
  }

  // Populate data on the client side:
  // 2. Get the error data from `windows`.
  if (!import.meta.env.SSR) {
    const errorClient = window.context.error
    if (errorClient && !isEmptyObject(errorClient)) {
      error.value = errorClient
    }
  }

  // Handle errors at the app level - final level. Handle errors that come from
  // anywhere in the app, such as the error occurs in `pages`, `components`,
  // and `composables` directories, etc, that are not caught in the `try-catch`
  // block.
  app.config.errorHandler = (err, vm, info) => {
    // Un-comment to see the log.
    // console.log('statusCode caught at the app level: ', err.statusCode)
    console.log('message caught at the app level: ', err.message)
    // console.log('stack caught at the app level: ', err.stack)
    
    // Note that `useSSRContext` only can be called inside here.
    // No need of this block as it is now handled in `error-boundary.vue`.
    // if (import.meta.env.SSR) {
    //   const ctx = useSSRContext()
    //   const failure = normalizeError(err)

    //   ctx.error = failure
    //   ctx.statusCode = failure.statusCode
    // }

    // Get the current route path from router.
    err.path = router.currentRoute.value.fullPath

    // Normalize the error data from the original error object.
    const failure = normalizeError(err)
    error.value = failure

    if (!import.meta.env.SSR) {
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

  return { app, router, head }
}
