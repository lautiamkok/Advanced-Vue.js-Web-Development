'use strict'

import index from '@/pages/index.vue'
import log from '@/middleware/log'

export default {
  name: 'index',
  path: '/',
  component: index,
  beforeEnter: [log]
}
