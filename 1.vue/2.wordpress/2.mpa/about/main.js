'use strict'

import { createApp } from 'vue'
import AutoImportComposables from '@/plugins/auto-import/composables'
import { 
  installGlobalComponents as AutoImportGlobalComponents, 
  installAboutPageComponents as AutoImportAboutComponents 
} from '@/plugins/auto-import/components'

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
  .use(AutoImportGlobalComponents)
  .use(AutoImportAboutComponents)
  .use(AutoImportComposables)
  .mount('#app')
