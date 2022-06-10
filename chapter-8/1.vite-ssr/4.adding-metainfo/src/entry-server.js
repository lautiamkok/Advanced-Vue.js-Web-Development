'use strict'

// Vue's server-rendering API is exposed under `vue/server-renderer`.
import { createApp } from './main.js'
import { renderToString } from 'vue/server-renderer'
import { renderHeadToString } from '@vueuse/head'

async function render(url) {
  const { app, router, head } = createApp()
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

  return context
}

export { render }
