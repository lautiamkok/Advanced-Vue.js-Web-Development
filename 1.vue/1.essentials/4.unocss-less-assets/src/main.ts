'use strict'

// Import styles.
import '@/styles'

import { createApp, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import router from '@/router'
import App from '@/App.vue'
import AutoImportComponents from '@/plugins/auto-import/components'
import AutoImportComposables from '@/plugins/auto-import/composables'

// Set up global stuff.
globalThis.ref = ref
globalThis.computed = computed
globalThis.useRoute = useRoute
globalThis.useRouter = useRouter

// Install global auto imports.
import utils from '@/utils'
utils()

const app = createApp(App)
app
  .use(AutoImportComponents)
  .use(AutoImportComposables)
  .use(router)
  
app.mount('#app')
