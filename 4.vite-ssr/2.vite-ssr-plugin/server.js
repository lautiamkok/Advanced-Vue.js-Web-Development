'use strict'

// Vue server-side rendering (SSR).
// https://github.com/frandiox/vite-ssr/blob/master/examples/node-server/index.js
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'path'
import { createServer } from 'node:http'
import connect from 'connect'
import serveStatic from 'serve-static'

// https://github.com/senchalabs/connect
const app = connect()
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const resolve = (p) => path.resolve(__dirname, p)

// This contains a list of static routes (assets)
const { ssr } = JSON.parse(
  fs.readFileSync(resolve('dist/server/package.json'), 'utf-8'),
)

// The manifest is required for preloading assets
const manifest = JSON.parse(
  fs.readFileSync(resolve('dist/client/ssr-manifest.json'), 'utf-8'),
)

// Serve every static asset route
for (const asset of ssr.assets || []) {
  app.use(
    `/${asset}`,
    serveStatic(path.join(__dirname, `./dist/client/${asset}`))
  )
}

// Everything else is treated as a "rendering request"
app.use(async (request, response) => {
  const url = request.url

  // This is the server renderer we just built.
  // const { default: renderPage } = (await import('./dist/server/main.js'))
  // Same as:
  const renderPage = (await import('./dist/server/main.js')).default

  // Now render the HTML.
  const { html, body, status, statusText, headers } = await renderPage(url, {
    manifest,
    preload: true,

    // Anything passed here will be available in the main hook
    request,
    response,
    
    // initialState: { ... } // <- This would also be available
  })

  response.setHeader('Content-Type', 'text/html')
  response.writeHead(status || 200)
  response.end(html)
})

const port = 3000
const server = createServer(app)
server.listen(port, () => {
  console.log(`Server started: http://localhost:${port}`)
})
