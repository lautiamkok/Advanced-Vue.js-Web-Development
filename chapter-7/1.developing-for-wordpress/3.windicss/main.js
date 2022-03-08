// Import styles.
import '@/styles'

import { createApp } from 'vue'
import Comment from '@/components/comment.vue'

const App = {
  data () {
    return {
      message: 'Hello World'
    }
  },

  components: {
    Comment
  }
}
createApp(App).mount('#app')
