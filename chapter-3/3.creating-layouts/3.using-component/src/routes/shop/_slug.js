'use strict'

import slug from '@/pages/shop/_slug.vue'
import layout from '@/middleware/layout/true'

// Dynamic Routes.
// https://next.router.vuejs.org/guide/essentials/dynamic-matching.html
export default {
  name: 'shop-slug',
  path: '/shop/:slug',
  component: slug,
  beforeEnter: [layout]
}
