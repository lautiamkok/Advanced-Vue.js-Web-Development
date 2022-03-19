'use strict'

// app.js (shared between server and client)
import App from './App.vue'
import { createSSRApp } from 'vue'
import { createRouter } from './router'
import { createHead } from '@vueuse/head'

export function createApp(isSSR = false) {
  const app = createSSRApp(App)
  const router = createRouter()
  const head = createHead()

  app.use(router)
  app.use(head)
  app.config.errorHandler = (err, instance, info) => {
    const statusCode = err.statusCode ? err.statusCode : 500
    app.error = err
    app.statusCode = statusCode
  }
  return { app, router, head }
}
