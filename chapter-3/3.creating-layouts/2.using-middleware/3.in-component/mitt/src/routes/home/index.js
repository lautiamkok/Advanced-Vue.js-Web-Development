'use strict'

import home from '@/pages/home.vue'
import log from '@/middleware/log'

export default {
  name: 'home',
  path: '/',
  component: home,
  beforeEnter: [log]
}
