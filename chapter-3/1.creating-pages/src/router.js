'use strict'

import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/routes'

// Create the router.
export default createRouter({
  history: createWebHistory(), // No # on the URLs.
  routes
})
