'use strict'

import error from '@/pages/[...error].vue'

export default {
  path: '/:error(.*)*',
  name: 'error',
  component: error
}
