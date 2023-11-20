'use strict'

// Import styles.
import '@/styles'

// Create the vue app here to be shared between server and client.
import App from '@/App.vue'
import { createSSRApp, ref } from 'vue'
import { createRouter } from '@/router'

// Set up global stuff.
globalThis.ref = ref

export async function createApp () {
  const app = createSSRApp(App)
  const router = createRouter()
  app.use(router)

  return { app, router }
}
