'use strict'

import slug from '@/pages/shop/_slug.vue'
import layout from '@/middleware/layout/fetch'

// Dynamic Routes.
// https://next.router.vuejs.org/guide/essentials/dynamic-matching.html
export default {
  name: 'shop-slug',
  path: '/shop/:slug',
  component: slug,

  // Note that `beforeEnter` is only triggered once. That means it won't
  // triggered again when going from /`product-2` to `/product-3`. So applying
  // middleware here is not a good idea if you need the layout to change from
  // one product page to another on the same dynamic route.
  beforeEnter: [layout]
}
