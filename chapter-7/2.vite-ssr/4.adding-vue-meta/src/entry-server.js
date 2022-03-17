'use strict'

// Vue's server-rendering API is exposed under `vue/server-renderer`.
import { createApp } from './main.js'
import { renderToString } from 'vue/server-renderer'
// import { renderMetaToString } from 'vue-meta/ssr'

// This snippet is copied from `/node_modules/vue-meta/ssr/index.js`. Remove it when
// Vue Meta 3 is ready for production.
async function renderMetaToString(app, ctx = {}) {
  // TODO: better way of determining whether meta was rendered with the component or not
  if (!ctx.teleports || !ctx.teleports.head) {
    const { renderToString } = await import('@vue/server-renderer');
    const teleports = app.config.globalProperties.$metaManager?.render();
    await Promise.all(teleports.map((teleport) => renderToString(teleport, ctx)));
  }
  const { teleports } = ctx;
  for (const target in teleports) {
    if (target.endsWith('Attrs')) {
      const str = teleports[target];
      // match from first space to first >, these should be all rendered attributes
      teleports[target] = str.slice(str.indexOf(' ') + 1, str.indexOf('>'));
    }
  }
  return ctx;
}

async function render(url) {
  const { app, router } = createApp(true)
  const context = {}

  // Set the router to the desired URL before rendering.
  router.push(url)
  await router.isReady()

  context.appHtml = await renderToString(app)
  context.statusCode = 200
  context.app = app

  await renderMetaToString(app, context)
  if (!context.teleports) {
    context.teleports = {}
  }

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
