'use strict'

import { createApp, ref, computed, onMounted, defineAsyncComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import router from '@/router'
import App from '@/App.vue'

import AutoImportComponents from '@/plugins/auto-import/components'
import AutoImportComposables from '@/plugins/auto-import/composables'

// Set up global stuff.
globalThis.ref = ref
globalThis.computed = computed
globalThis.onMounted = onMounted
globalThis.defineAsyncComponent = defineAsyncComponent
globalThis.useRoute = useRoute
globalThis.useRouter = useRouter

// Install global auto imports.
import utils from '@/utils'
utils()

createApp(App)
  .use(AutoImportComponents)
  .use(AutoImportComposables)
  .use(router)
  .mount('#app')
