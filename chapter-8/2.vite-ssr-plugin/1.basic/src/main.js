'use strict'

import viteSSR from 'vite-ssr'
import { createHead } from '@vueuse/head'
import App from '@/App.vue'
import routes from '~pages'

// https://github.com/frandiox/vite-ssr
export default viteSSR(App, 
  { 
    routes 
  }, 
  ({ app, router, initialState, request }) => {
    const head = createHead()
    app.use(head)

    // https://github.com/frandiox/vite-ssr#head-tags-and-global-attributes
    return { head }
  }
)
