'use strict'

import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/routes'

const apiBaseUrl = import.meta.env.VITE_REMOTE_API_BASE_URL

// Create the router.
const router = createRouter({
  history: createWebHistory(), // No # on the URLs.
  routes
})

// Create the router.
export default router
