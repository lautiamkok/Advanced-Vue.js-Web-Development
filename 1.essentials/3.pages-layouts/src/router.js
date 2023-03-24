'use strict'

import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
import layout from '@/middleware/layout'

// Create the router.
const router = createRouter({
  history: createWebHistory(), // No # on the URLs.
  routes
})
router.beforeEach(layout)

export default router
