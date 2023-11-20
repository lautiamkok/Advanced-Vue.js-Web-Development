'use strict'

import { createApp, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import router from '@/router'
import App from '@/App.vue'

// Set up global stuff.
globalThis.ref = ref
globalThis.computed = computed
globalThis.useRoute = useRoute
globalThis.useRouter = useRouter

createApp(App)
  .use(router)
  .mount('#app')
