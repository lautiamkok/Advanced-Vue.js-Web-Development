'use strict'

import { createRouter, createWebHistory } from 'vue-router'
import layout from '@/middleware/layout/fetch'
import routes from '@/routes'

// Create the router.
const router = createRouter({
  history: createWebHistory(), // No # on the URLs.
  routes
})

// Register a global before guard.
// https://next.router.vuejs.org/api/#beforeeach
// https://next.router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
router.beforeEach(layout)

// Create the router.
export default router
