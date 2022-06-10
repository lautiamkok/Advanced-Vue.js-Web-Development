'use strict'

// Vue's server-rendering API is exposed under `vue/server-renderer`.
import { createApp } from './main.js'
import { renderToString } from 'vue/server-renderer'

async function render(url) {
  const { app, router } = createApp()

  // Set the router to the desired URL before rendering.
  router.push(url)
  await router.isReady()

  const appHtml = await renderToString(app)
  return appHtml
}

export { render }
