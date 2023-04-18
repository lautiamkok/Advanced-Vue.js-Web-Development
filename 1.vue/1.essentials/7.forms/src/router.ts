'use strict'

import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

// Create the router.
const router = createRouter({
  history: createWebHistory(), // No # on the URLs.
  routes
})

export default router
