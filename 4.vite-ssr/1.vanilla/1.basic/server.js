'use strict'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createServer } from 'node:http'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const resolve = (p) => path.resolve(__dirname, p)
const isProd = process.env.NODE_ENV === 'production'

const port = 3636
const host = 'localhost'
const stack = []

// The manifest json is required for preloading assets.
const manifest = isProd
  ? JSON.parse(
      fs.readFileSync(resolve('dist/client/ssr-manifest.json'), 'utf-8'),
    )
  : {}

function handleStack (req, res) {
  var index = 0
  function next() {
    // next callback
    var layer = stack[index++]

    // call the layer handle
    layer.handle(req, res, next)
  }
  next()
}

function serveStatic (req, res, next) {
  const url = req.url
  if (!url.includes('.')) {
    next()
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
      res.setHeader('Content-Type', 'text/plain')
      if (url.includes('.js')) {
        res.setHeader('Content-Type', 'application/javascript')
      }
      if (url.includes('.css')) {
        res.setHeader('Content-Type', 'text/css')
      }
      if (url.includes('.svg')) {
        res.setHeader('Content-Type', 'image/svg+xml')
      }
      res.writeHead(200)
      res.end(data)
    })
  }
}

async function finalHandler (req, res) {
  const url = req.url

  let template
  if (!isProd) {
    template = fs.readFileSync(
      path.resolve(__dirname, 'index.html'),
      'utf-8'
    )
  } else {
    template = fs.readFileSync(
      path.resolve(__dirname, 'dist/client/index.html'),
      'utf-8'
    )
  }

  let render
  if (!isProd) {
    await vite.transformIndexHtml(url, template)
    render = (await vite.ssrLoadModule('/src/entry-server.ts')).render
  } else {
    render = (await import('./dist/server/entry-server.js')).render
  }
  const { 
    appHtml,
    preloadLinks,
    statusCode
  } = await render(url, manifest)
  
  const html = template
    .replace(`{{ preloadLinks }}`, preloadLinks)
    .replace(`{{ appHtml }}`, appHtml)

  res.setHeader('Content-Type', 'text/html')
  res.writeHead(statusCode)
  res.end(html)
}

let vite
if (!isProd) {
  vite = await (await import('vite')).createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  // Use vite's connect instance as middleware.
  stack.push({ handle: (req, res, next) => {
      vite.middlewares.handle(req, res, next)
    }
  })
} else {
  // If you wish to use `serve-static` to serve assets.
  // stack.push({ handle: (await import('serve-static')).default(resolve('dist/client'), {
  //     index: false
  //   })
  // })

  stack.push({ handle: serveStatic })
}

const requestListener = async function (req, res) {
  stack.push({ handle: finalHandler })
  handleStack(req, res)
}

const server = createServer(requestListener)
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`)
})

// Or, wrap everything in `createApp` just like Express, Connect, etc.
// function createApp() {
//   function app (req, res) { 
//     app.handle(req, res)
//   }
//   app.stack = []

//   app.use = function use (fn) {
//     var handle = fn

//     // wrap sub-apps
//     if (typeof handle.handle === 'function') {
//       var server = handle
//       handle = function (req, res, next) {
//         server.handle(req, res, next)
//       }
//     }

//     // add the middleware
//     this.stack.push({ handle: handle })

//     return this
//   }

//   app.handle = function handle (req, res) {
//     var index = 0
//     var stack = this.stack

//     function next() {
//       // next callback
//       var layer = stack[index++]
//       console.log(index, layer)

//       // call the layer handle
//       layer.handle(req, res, next)
//     }

//     next()
//   }

//   return app
// }

// async function bootstrap () {
//   const app = createApp()

//   const vite = await (await import('vite')).createServer({
//     server: { middlewareMode: true },
//     appType: 'custom'
//   })
//   app.use(vite.middlewares)

//   app.use(async (req, res) => {
//     const url = req.url

//     // Read index.html.
//     const template = fs.readFileSync(
//       path.resolve(__dirname, 'index.html'),
//       'utf-8'
//     )

//     let render
//     // Apply Vite HTML transforms. This injects the Vite HMR client, and also
//     // applies HTML transforms from Vite plugins.
//     await vite.transformIndexHtml(url, template)

//     // Load the server entry. vite.ssrLoadModule automatically transforms your
//     // ESM source code to be usable in Node.js! There is no bundling
//     // required, and provides efficient invalidation similar to HMR.
//     render = (await vite.ssrLoadModule('/src/entry-server.ts')).render

//     // Render the app HTML. This assumes entry-server.js's exported `render`
//     // function calls appropriate framework SSR APIs.
//     const { 
//       appHtml, 
//     } = await render(url)

//     const html = template
//       .replace(`{{ appHtml }}`, appHtml)

//     res.setHeader('Content-Type', 'text/html')
//     res.writeHead(200)
//     res.end(html)
//   })

//   const host = 'localhost'
//   const port = 3636
//   const server = http.createServer(app)
//   server.listen(port, () => {
//     console.log(`Server is running on http://${host}:${port}`)
//   })
// }
// bootstrap()
