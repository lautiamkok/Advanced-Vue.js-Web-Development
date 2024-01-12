'use strict'

// app.js (shared between server and client)
import App from './App.vue'
import { createSSRApp } from 'vue'
import { createRouter } from './router'

export function createApp() {
  const app = createSSRApp(App)
  const router = createRouter()
  app.use(router)
  return { app, router }
}
