'use strict'

import { createApp, ref, computed, watch, unref, onErrorCaptured } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import router from '@/router'
import App from '@/App.vue'
import AutoImportComponents from '@/plugins/auto-import/components'
import AutoImportComposables from '@/plugins/auto-import/composables'

// Set up global stuff.
globalThis.ref = ref
globalThis.computed = computed
globalThis.watch = watch
globalThis.unref = unref
globalThis.onErrorCaptured = onErrorCaptured
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

  // Handle errors at the app level - final level. Handle errors that come from
  // anywhere in the app, such as the error occurs in `pages`, `components`,
  // and `composables` directories, etc, that are not caught in the `try-catch`
  // block.
  .config.errorHandler = (err, vm, info) => {
    // Un-comment to see the log.
    // console.log('message caught at the app level: ', err.message)
    // console.log('stack caught at the app level: ', err.stack)
    // console.log('statusCode caught at the app level: ', err.statusCode)
  }

app.mount('#app')
