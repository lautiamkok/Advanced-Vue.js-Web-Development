'use strict'

import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

import log from '@/middleware/log'
import layout from '@/middleware/layout/fetch'

for(let route of routes) {
  if (route.path === '/about') {
    route.beforeEnter = [log, layout]
  }

  if (route.path === '/blog') {
    route.children.forEach(child => {
      if (child.path === ':slug') {
        child.beforeEnter = layout
      }
    })
  }

  if (route.path === '/shop/:slug') {
    route.beforeEnter = layout
  }
}

// Create the router.
export default createRouter({
  history: createWebHistory(), // No # on the URLs.
  routes
})
