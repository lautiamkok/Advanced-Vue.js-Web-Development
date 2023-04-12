'use strict'

import { createApp } from 'vue'
import router from '@/router'
import App from '@/App.vue'
import AutoImportComponents from '@/plugins/auto-import/components'
import AutoImportComposables from '@/plugins/auto-import/composables'

const { error, normalizeError } = useError()
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
    // console.log('status caught at the app level: ', err.status)
    // console.log('message caught at the app level: ', err.message)
    // console.log('stack caught at the app level: ', err.stack)

    // Normalize the error data from the original error object.
    const failure = normalizeError(err)
    error.value = failure
  }

app.mount('#app')
