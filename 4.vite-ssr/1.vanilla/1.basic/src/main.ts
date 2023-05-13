'use strict'

// Import styles.
import '@/styles'

// Create the vue app here to be shared between server and client.
import App from '@/App.vue'
import { createSSRApp } from 'vue'
import { createRouter } from '@/router'

export async function createApp () {
  const app = createSSRApp(App)
  const router = createRouter()
  app.use(router)

  return { app, router }
}
