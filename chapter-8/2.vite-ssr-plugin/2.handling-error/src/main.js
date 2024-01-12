'use strict'

import viteSSR from 'vite-ssr'
import { createHead } from '@vueuse/head'
import App from '@/App.vue'
import routes from '~pages'

// https://github.com/frandiox/vite-ssr
export default viteSSR(App, 
  { 
    routes 
  }, 
  ({ app, router, initialState, request, isClient, writeResponse }) => {
    const head = createHead()
    app.use(head)

    app.config.errorHandler = (err, instance, info) => {
      const statusCode = err.statusCode ? err.statusCode : 500
      if (isClient) {
        location.reload()
      }
      if (import.meta.env.SSR) {
        writeResponse({
          status: statusCode,
          html: err.message
        })
      }
    }

    // https://github.com/frandiox/vite-ssr#head-tags-and-global-attributes
    return { head }
  }
)
