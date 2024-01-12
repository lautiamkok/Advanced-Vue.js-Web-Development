import { createApp } from 'vue'
import App from './App.vue'

// Import mixins.
import MixinsUtils from './mixins/utils'

createApp(App)
  // Make mixins global.
  .mixin(MixinsUtils)

  // Finally mount the app to #app.
  .mount('#app')
