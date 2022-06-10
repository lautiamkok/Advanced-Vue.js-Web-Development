'use strict'

// Vue's server-rendering API is exposed under `vue/server-renderer`.
import { createApp } from './main.js'
import { renderToString } from 'vue/server-renderer'

async function render(url, req) {
  const { app, router } = createApp()

  // Set the router to the desired URL before rendering.
  router.push(url)
  await router.isReady()

  // Create a share data in a context object and pass it into renderToString, so
  // that it can be accessed in Vue components using useSSRContext.
  // https://vuejs.org/api/ssr.html#usessrcontext
  // https://stackoverflow.com/a/68474846/413225
  const ctx = {}
  ctx.req = req

  const appHtml = await renderToString(app, ctx)
  return appHtml
}

export { render }
