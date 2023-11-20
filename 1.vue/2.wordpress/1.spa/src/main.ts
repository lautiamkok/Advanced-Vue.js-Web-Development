'use strict'

import { createApp, ref, computed } from 'vue'
import AutoImportComponents from '@/plugins/auto-import/components'
import AutoImportComposables from '@/plugins/auto-import/composables'

// Import styles.
import '@/styles'

// Set up global stuff.
globalThis.ref = ref
globalThis.computed = computed

// Install global auto imports.
import utils from '@/utils'
utils()

const app = createApp({
  data: () => ({
    content: 'Hello World'
  })
})

app
  .use(AutoImportComponents)
  .use(AutoImportComposables)
  .mount('#app')
