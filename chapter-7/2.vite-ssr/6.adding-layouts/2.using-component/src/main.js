'use strict'

// Import styles.
import './styles'

// app.js (shared between server and client)
import App from './App.vue'
import store from './store'
import { createSSRApp } from 'vue'
import { createRouter } from './router'

export function createApp() {
  const app = createSSRApp(App)
  const router = createRouter()
  app
    .use(router)
    .use(store)

  return { app, router }
}
