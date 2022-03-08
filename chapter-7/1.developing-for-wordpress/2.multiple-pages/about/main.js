import { createApp } from 'vue'
import Feedback from '@/components/feedback.vue'

const App = {
  data () {
    return {
      message: 'You are on About page!'
    }
  },

  components: {
    Feedback
  }
}
createApp(App).mount('#app')
