'use strict'

import shop from '@/pages/shop.vue'
import layout from '@/middleware/layout/fetch'

export default {
  name: 'shop',
  path: '/shop',
  component: shop,
  beforeEnter: [layout],

  // Pass parameters to middleware.
  // https://github.com/nuxt/nuxt.js/issues/1687#issuecomment-331870619
  meta: {
    slug: 'shop'
  }
}
