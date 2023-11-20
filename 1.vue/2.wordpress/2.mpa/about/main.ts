'use strict'

import { createApp, ref, computed } from 'vue'
import AutoImportComposables from '@/plugins/auto-import/composables'
import { 
  installGlobalComponents as AutoImportGlobalComponents, 
  installAboutPageComponents as AutoImportAboutComponents 
} from '@/plugins/auto-import/components'

// Set up global stuff.
globalThis.ref = ref
globalThis.computed = computed

// Install global auto imports.
import utils from '@/utils'
utils()

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
