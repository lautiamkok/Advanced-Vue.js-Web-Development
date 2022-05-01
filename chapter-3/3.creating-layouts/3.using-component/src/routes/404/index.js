'use strict'

import page404 from '@/pages/404.vue'

// https://next.router.vuejs.org/guide/essentials/dynamic-matching.html#catch-all-404-not-found-route
export default {
  path: '/:pathMatch(.*)*',
  name: '404',
  component: page404
}
