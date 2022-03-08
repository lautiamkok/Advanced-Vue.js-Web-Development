'use strict'

import about from '@/pages/about.vue'
import log from '@/middleware/log'
import layout from '@/middleware/layout/true'

export default {
  name: 'about',
  path: '/about',
  component: about,
  beforeEnter: [log, layout]
}
