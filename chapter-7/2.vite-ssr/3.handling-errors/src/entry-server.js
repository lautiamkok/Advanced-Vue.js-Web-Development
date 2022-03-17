'use strict'

// Vue's server-rendering API is exposed under `vue/server-renderer`.
import { createApp } from './main.js'
import { renderToString } from 'vue/server-renderer'

async function render(url) {
  const { app, router } = createApp()
  const context = {}

  // Set the router to the desired URL before rendering.
  router.push(url)
  await router.isReady()

  context.appHtml = await renderToString(app)
  context.statusCode = 200

  // If the app has an error, then get the status code from it.
  if (app.error) {
    context.statusCode = app.statusCode
  }
  // If the 404 page is being used, then set the status code to 404.
  if (router.currentRoute.value.name === '404') {
    context.statusCode = 404
  }

  return context
}

export { render }
