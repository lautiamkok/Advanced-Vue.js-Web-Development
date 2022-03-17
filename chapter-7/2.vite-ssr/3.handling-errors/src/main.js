'use strict'

// app.js (shared between server and client)
import App from './App.vue'
import { createSSRApp } from 'vue'
import { createRouter } from './router'

export function createApp() {
  const app = createSSRApp(App)
  const router = createRouter()
  app.use(router)
  app.config.errorHandler = (err, instance, info) => {
    const statusCode = err.statusCode ? err.statusCode : 500
    app.error = err
    app.statusCode = statusCode
  }
  return { app, router }
}
