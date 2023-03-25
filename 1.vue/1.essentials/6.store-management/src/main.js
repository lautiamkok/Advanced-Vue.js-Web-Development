'use strict'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'
import App from '@/App.vue'
import AutoImportComponents from '@/plugins/auto-import/components'
import AutoImportComposables from '@/plugins/auto-import/composables'

const app = createApp(App)
const pinia = createPinia()

app
  .use(AutoImportComponents)
  .use(AutoImportComposables)
  .use(pinia)
  .use(router)
  .mount('#app')
