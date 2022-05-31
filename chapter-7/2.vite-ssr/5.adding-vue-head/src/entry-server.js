'use strict'

// Vue's server-rendering API is exposed under `vue/server-renderer`.
import { createApp } from './main.js'
import { renderToString } from 'vue/server-renderer'
import { renderHeadToString } from '@vueuse/head'

async function render(url) {
  const { app, router, head } = createApp(true)
  const context = {}

  // Set the router to the desired URL before rendering.
  router.push(url)
  await router.isReady()

  context.appHtml = await renderToString(app)
  context.statusCode = 200
  context.app = app

  const { headTags, htmlAttrs, bodyAttrs } = renderHeadToString(head)
  context.headTags = headTags
  context.htmlAttrs = htmlAttrs

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
