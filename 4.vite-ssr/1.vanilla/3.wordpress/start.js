'use strict'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createServer } from 'node:http'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const resolve = (p) => path.resolve(__dirname, p)
const isWordpress = process.env.NODE_PROD === 'wordpress'

const port = 3000
const host = 'localhost'

// The manifest json is required for preloading assets.
const manifest = JSON.parse(
  fs.readFileSync(resolve('dist/client/ssr-manifest.json'), 'utf-8'),
)

function getContentType (url) {
  // Set the content types you want to serve.
  // List of MIME types / Internet Media Types:
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
  // https://www.geeksforgeeks.org/http-headers-content-type/
  const mimeTypes = {
    js: 'application/javascript',
    css: 'text/css',
    svg: 'image/svg+xml'
  }

  const ext = path.extname(url).replace(/\./g, '')
  return mimeTypes[ext] ?? 'text/plain'
}

const requestListener = async function (req, res) {
  const url = req.url

  // Serve html or assets.
  if (!url.includes('.')) {
    const template = fs.readFileSync(
      path.resolve(__dirname, 'dist/client/index.html'),
      'utf-8'
    )

    const render = (await import('./dist/server/entry-server.js')).render
    const { 
      appHtml, 
      statusCode, 
      ctx, 
      preloadLinks, 
      headTags, 
      htmlAttrs
    } = await render(url, manifest, req)
    
    const ssrContext = `<script>window.context = ${JSON.stringify(ctx)}</script>`
    const html = template
      .replace(`{{ preloadLinks }}`, preloadLinks)
      .replace(`{{ ssrContext }}`, ssrContext)
      .replace(`{{ appHtml }}`, appHtml)
      .replace(`{{ headTags }}`, headTags)
      .replace(`{{ htmlAttrs }}`, htmlAttrs)

    // Just return a json if it is built for WordPress.
    if (isWordpress) {
      // Set the response header content type: application/json.
      res.setHeader('Content-Type', 'application/json')

      // Set the response statusCode code: 200, 404, 500, etc.
      res.writeHead(statusCode)

      const data = {
        preloadLinks,
        ssrContext,
        appHtml,
        headTags,
        htmlAttrs
      }

      // End the res here.
      res.end(JSON.stringify(data))
    } else {
      res.setHeader('Content-Type', 'text/html')
      res.writeHead(statusCode)
      res.end(html)
    }
  } else {
    // Serve all static files.
    // Use `decodeURIComponent` to decode non-English characters in the URL.
    fs.readFile(`./dist/client/${decodeURIComponent(req.url)}`, (err,data) => {
      if (err) {
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({
          message: 'File not found or you made an invalid request.',
          data: err
        }))
        return
      }
      
      res.setHeader('Content-Type', getContentType(url))
      res.writeHead(200)
      res.end(data)
    })
  }
}

const server = createServer(requestListener)
server.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`)
})
