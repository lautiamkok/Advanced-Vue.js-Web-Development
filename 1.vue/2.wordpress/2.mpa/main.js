'use strict'

import { createApp } from 'vue'
import AutoImportComposables from '@/plugins/auto-import/composables'
import { 
  installGlobalComponents as AutoImportGlobalComponents, 
  installIndexPageComponents as AutoImportIndexComponents 
} from '@/plugins/auto-import/components'

// Components for home page only.
// import Comment from '@/components/comment.vue'

// Import styles.
import '~/styles'

const app = createApp({
  data: () => ({
    content: 'Hello World'
  }),

  // components: {
  //   Comment
  // }
})

app
  .use(AutoImportGlobalComponents)
  .use(AutoImportIndexComponents)
  .use(AutoImportComposables)
  .mount('#app')
