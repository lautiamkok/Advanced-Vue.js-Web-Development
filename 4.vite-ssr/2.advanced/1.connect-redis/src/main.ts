'use strict'

// Import styles.
import '@/styles'

// Create the vue app here to be shared between server and client.
import App from '@/App.vue'
import { createSSRApp, ref, computed, watch, reactive, unref, onErrorCaptured, useSSRContext } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { createHead, useHead } from '@vueuse/head'
import { createPinia } from 'pinia'

import { createRouter } from '@/router'
import AutoImportComponents from '@/plugins/auto-import/components'
import AutoImportComposables from '@/plugins/auto-import/composables'
import { useCartStore } from '@/stores/cart'
import { useErrorStore } from '@/stores/error'

// Set up global stuff.
globalThis.ref = ref
globalThis.computed = computed
globalThis.watch = watch
globalThis.unref = unref
globalThis.reactive = reactive
globalThis.onErrorCaptured = onErrorCaptured
globalThis.useSSRContext = useSSRContext
globalThis.useRoute = useRoute
globalThis.useRouter = useRouter
globalThis.useHead = useHead

// Install global auto imports.
import utils from '@/utils'
utils()

export async function createApp (req = null, res = null) {
  const app = createSSRApp(App)
  const router = createRouter()
  const head = createHead()
  const pinia = createPinia()

  app.use(AutoImportComponents)
  app.use(AutoImportComposables)
  app.use(router)
  app.use(head)
  app.use(pinia)

  // SSR initial state and data fetching:
  // 1. Call Redis before entering a route and populate the cart store.
  router.beforeEach(async (to, from) => {
    if (import.meta.env.SSR) {
      const cartNamespace = import.meta.env.VITE_APP_CART_NS
      const baseURL = import.meta.env.VITE_API_REDIS_BASE_URL
      const store = useCartStore()

      // Reset before populating.
      store.cart = []

      // Get the value of the cart cookie from cookie and use it to set a key in
      // Redis db.
      const { get } = useCookie()
      const cookie = req.headers.cookie
      const value = cookie ? get(cartNamespace, cookie) : null
      const key = value ? `${cartNamespace}:${value}` : null
      const { data } = await useF3tch(`/carts/${key}`, {
        baseURL
      })
      const cartFromRedis = JSON.parse(data.value) ?? [] 
      store.cart = cartFromRedis
    }
  })

  // 2. Call Redis before entering a route and populate the error store.
  router.beforeEach(async (to, from) => {
    if (import.meta.env.SSR) {
      const errorNamespace = import.meta.env.VITE_APP_ERROR_NS
      const baseURL = import.meta.env.VITE_API_REDIS_BASE_URL
      const store = useErrorStore()

      // Reset before populating.
      store.error = false

      // Get the value of the error cookie from cookie and use it to set a key
      // in Redis db.
      const { get, drop } = useCookie()
      const cookie = req.headers.cookie
      const value = cookie ? get(errorNamespace, cookie) : null
      const key = value ? `${errorNamespace}:${value}` : null
      const { data } = await useF3tch(`/errors/${key}`, {
        baseURL
      })
      const errorFromRedis = JSON.parse(data.value) ?? false

      // Only populate if the current path and the error path are matched.
      if (errorFromRedis.path === to.path) {
        store.error = errorFromRedis
      }
    }
  })

  // Handle errors at the app level - final level. Handle errors that come from
  // anywhere in the app, such as the error occurs in `pages`, `components`,
  // and `composables` directories, etc, that are not caught in the `try-catch`
  // block and that are not handled in `/App.vue`.
  app.config.errorHandler = (err, vm, info) => {
    // Un-comment to see the log.
    // console.log('statusCode caught at the app level: ', err.statusCode)
    // console.log('stack caught at the app level: ', err.stack)
    console.log('message caught at the app level: ', err.message)
  }

  return { app, router, head }
}
