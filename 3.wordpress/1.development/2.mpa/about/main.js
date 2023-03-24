'use strict'

import { createApp } from 'vue'
import AutoImportComponents from '@/plugins/auto-import/components/index'
import AutoImportComponentsAbout from '@/plugins/auto-import/components/about'
import AutoImportComposables from '@/plugins/auto-import/composables'

// Components for About page only.
// import Feedback from '@/components/feedback.vue'

// Import styles.
import '~/styles'

const app = createApp({
  data: () => ({
    content: 'You are on About page!'
  }),

  // components: {
  //   Feedback
  // }
})

app
  .use(AutoImportComponents)
  .use(AutoImportComponentsAbout)
  .use(AutoImportComposables)
  .mount('#app')
