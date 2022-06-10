import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import routes from '~pages'

// `export const createApp` is required instead of the original `createApp
// (App).mount('#app')`
// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  // the root component
  App,

  // vue-router options
  { routes }
)
