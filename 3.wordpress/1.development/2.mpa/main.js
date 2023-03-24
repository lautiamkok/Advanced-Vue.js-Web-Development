'use strict'

import { createApp } from 'vue'
import AutoImportComponents from '@/plugins/auto-import/components/index'
import AutoImportComponentsIndex from '@/plugins/auto-import/components/index/index'
import AutoImportComposables from '@/plugins/auto-import/composables'

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
  .use(AutoImportComponents)
  .use(AutoImportComponentsIndex)
  .use(AutoImportComposables)
  .mount('#app')
