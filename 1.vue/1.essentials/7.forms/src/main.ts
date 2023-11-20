'use strict'

import { createApp, ref, computed, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import router from '@/router'
import App from '@/App.vue'
import AutoImportComponents from '@/plugins/auto-import/components'

// Set up global stuff.
globalThis.ref = ref
globalThis.computed = computed
globalThis.reactive = reactive
globalThis.useRoute = useRoute
globalThis.useRouter = useRouter

// Install global auto imports.
import utils from '@/utils'
utils()

createApp(App)
  .use(AutoImportComponents)
  .use(router)
  .mount('#app')
