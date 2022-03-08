'use strict'

import error from '@/pages/error.vue'

export default {
  path: '/:pathMatch(.*)*',
  name: 'error',
  component: error
}
