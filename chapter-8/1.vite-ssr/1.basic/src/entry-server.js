'use strict'

// Vue's server-rendering API is exposed under `vue/server-renderer`.
import { renderToString } from 'vue/server-renderer'
import { createApp } from './main.js'
const app = createApp()

async function render(url) {
  const appHtml = await renderToString(app)
  return appHtml
}

export { render }
