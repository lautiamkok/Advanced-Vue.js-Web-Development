'use strict'

import { createApp } from 'vue'
import router from '@/router'
import App from '@/App.vue'
import AutoImportComponents from '@/plugins/auto-import/components'

createApp(App)
  .use(AutoImportComponents)
  .use(router)
  .mount('#app')
