'use strict'

import { createApp } from 'vue'
import router from '@/router'
import App from '@/App.vue'
import AutoImportComponents from '@/plugins/auto-import/components'
import AutoImportComposables from '@/plugins/auto-import/composables'

createApp(App)
  .use(AutoImportComponents)
  .use(AutoImportComposables)
  .use(router)
  .mount('#app')
