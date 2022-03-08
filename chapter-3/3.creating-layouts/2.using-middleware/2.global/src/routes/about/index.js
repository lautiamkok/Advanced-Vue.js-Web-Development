'use strict'

import about from '@/pages/about.vue'
import log from '@/middleware/log'

export default {
  name: 'about',
  path: '/about',
  component: about,
  beforeEnter: [log],

  // Pass parameters to middleware.
  meta: {
    slug: 'about'
  }
}
