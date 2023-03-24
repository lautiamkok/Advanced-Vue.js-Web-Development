'use strict'

import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory
} from 'vue-router'
import routes from '~pages'
import clearError from '@/middleware/clear-error'

export function createRouter () {
  const router = _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
  })

  // router.afterEach(clearError)

  return router
}
