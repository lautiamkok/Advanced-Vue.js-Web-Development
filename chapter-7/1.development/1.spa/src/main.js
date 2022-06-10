import { createApp } from 'vue'
// Or:
// import { createApp } from 'vue/dist/vue.esm-bundler'

import Comment from '@/components/comment.vue'
import PostItem from '@/components/post-item.vue'
import useDate from '@/composables/use-date'

const App = {
  data () {
    return {
      message: 'Hello World'
    }
  },

  components: {
    Comment,
    PostItem
  },

  methods: {
    useDate
  }
}
createApp(App).mount('#app')

// Alternative for registering the component Application API.
// https://vuejs.org/api/application.html
// const App = {
//   data () {
//     return {
//       message: 'Hello World'
//     }
//   },

//   methods: {
//     useDate
//   }
// }
// createApp(App)
//   .component('Comment', Comment)
//   .component('PostItem', PostItem)
//   .mount('#app')
