'use strict'

import all from '@/pages/[...all].vue'

// https://next.router.vuejs.org/guide/essentials/dynamic-matching.html#catch-all-404-not-found-route
export default {
  path: '/:all(.*)*',
  name: 'all',
  component: all
}
