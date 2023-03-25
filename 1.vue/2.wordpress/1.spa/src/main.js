'use strict'

import { createApp } from 'vue'
import AutoImportComponents from '@/plugins/auto-import/components'
import AutoImportComposables from '@/plugins/auto-import/composables'

// Import styles.
import '@/styles'

const app = createApp({
  data: () => ({
    content: 'Hello World'
  })
})

app
  .use(AutoImportComponents)
  .use(AutoImportComposables)
  .mount('#app')
