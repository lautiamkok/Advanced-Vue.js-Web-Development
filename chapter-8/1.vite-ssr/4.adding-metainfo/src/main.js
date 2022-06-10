'use strict'

// app.js (shared between server and client)
import App from './App.vue'
import { createSSRApp } from 'vue'
import { createRouter } from './router'
import { createHead } from '@vueuse/head'

export function createApp() {
  const app = createSSRApp(App)
  const router = createRouter()
  const head = createHead()

  app.use(router)
  app.use(head)
  return { app, router, head }
}
