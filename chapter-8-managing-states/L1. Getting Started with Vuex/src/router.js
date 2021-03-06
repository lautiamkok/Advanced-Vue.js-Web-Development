'use strict'

import Vue from 'vue'
import VueRouter from 'vue-router'

import Routes from './routes'

// Install router plugins.
// This installs <router-view> and <router-link>,
// and injects $router and $route to all router-enabled child components
// https://github.com/vuejs/vue-router
Vue.use(VueRouter)

// A quick fix for "vueRouter:Avoided redundant navigation to current location".
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

// Create the router.
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: Routes
})

export default router
