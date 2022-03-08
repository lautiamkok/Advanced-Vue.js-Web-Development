'use strict'

import shop from '@/pages/shop.vue'

export default {
  name: 'shop',
  path: '/shop',
  component: shop,

  // Pass parameters to middleware.
  meta: {
    layout: { slug: 'shop' }
  }
}
