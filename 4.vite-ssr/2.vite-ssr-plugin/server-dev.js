'use strict'

// Run your own dev server (e.g. Express.js) instead of Vite's default Node +
// Connect. Then you must change your package.json as follows:
// "dev": "node server-dev" 
// Vite SSR plugin is not an ES module, so you must remove the following script:
// "type": "module"
// https://github.com/frandiox/vite-ssr#middleware-mode
const express = require('express')
const { createSsrServer } = require('vite-ssr/dev')

async function createServer() {
  const app = express()

  // Create vite-ssr server in middleware mode.
  const viteServer = await createSsrServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  // Use vite's connect instance as middleware
  app.use(viteServer.middlewares)

  app.listen(3000)
}

createServer()
