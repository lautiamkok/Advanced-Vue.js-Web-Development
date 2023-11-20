'use strict'

import { createApp, ref, computed, watch, reactive, unref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { createPinia } from 'pinia'
import router from '@/router'
import App from '@/App.vue'
import AutoImportComponents from '@/plugins/auto-import/components'
import AutoImportComposables from '@/plugins/auto-import/composables'

// Set up global stuff.
globalThis.ref = ref
globalThis.computed = computed
globalThis.watch = watch
globalThis.unref = unref
globalThis.reactive = reactive
globalThis.useRoute = useRoute
globalThis.useRouter = useRouter

// Install global auto imports.
import utils from '@/utils'
utils()

const app = createApp(App)
const pinia = createPinia()

app
  .use(AutoImportComponents)
  .use(AutoImportComposables)
  .use(pinia)
  .use(router)
  .mount('#app')
