'use strict'

import about from '@/pages/about.vue'
import log from '@/middleware/log'
import layout from '@/middleware/layout/fetch'

export default {
  name: 'about',
  path: '/about',
  component: about,

  // Set the layout manually.
  // meta: { layout: 'dark' },

  // Set the layout dynamically only to this route. Set multiple guards. Note
  // that `beforeEnter` guards only trigger when entering the route, they don't
  // trigger when the params, query or hash change e.g. going from /users/2
  // to /users/3 or going from /users/2#info to /users/2#projects. They are
  // only triggered when navigating from a different route.
  // https://next.router.vuejs.org/guide/advanced/navigation-guards.html#per-route-guard
  beforeEnter: [log, layout],

  // Pass parameters to middleware.
  // https://github.com/nuxt/nuxt.js/issues/1687#issuecomment-331870619
  meta: {
    slug: 'about'
  }
}
