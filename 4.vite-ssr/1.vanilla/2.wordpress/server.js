'use strict'

// Vue server-side rendering (SSR).
// https://vitejs.dev/guide/ssr.html
// https://vuejs.org/guide/scaling-up/ssr.html
// https://github.com/vitejs/vite-plugin-vue/tree/main/playground/ssr-vue
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createServer as createViteServer } from 'vite'
import { createServer } from 'node:http'
import connect from 'connect'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const resolve = (p) => path.resolve(__dirname, p)

async function bootstrap (
  isProd = process.env.NODE_ENV === 'production',
  isWordpress = process.env.NODE_PROD === 'wordpress'
) {
  // https://github.com/senchalabs/connect
  const app = connect()

  // Read index.html.
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

  // The manifest json is required for preloading assets.
  const manifest = isProd
    ? JSON.parse(
        fs.readFileSync(resolve('dist/client/ssr-manifest.json'), 'utf-8'),
      )
    : {}

  // Don't run Vite on production.
  let vite
  if (!isProd) {
    // Create Vite server in middleware mode and configure the app type as
    // 'custom', disabling Vite's own HTML serving logic so parent server
    // can take control
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    })

    // Use vite's connect instance as middleware
    // If you use your own express router (express.Router()), you should use router.use
    app.use(vite.middlewares)
  } else {
    // Serve the assets in the `dist/client` folder on production.
    app.use(
      (await import('serve-static')).default(resolve('dist/client'), {
        index: false,
      }),
    )
  }

  app.use(async (req, res) => {
    const url = req.url

    try {
      let render
      if (!isProd) {
        // Apply Vite HTML transforms. This injects the Vite HMR client, and also
        // applies HTML transforms from Vite plugins.
        template = await vite.transformIndexHtml(url, template)

        // Load the server entry. vite.ssrLoadModule automatically transforms your
        // ESM source code to be usable in Node.js! There is no bundling
        // required, and provides efficient invalidation similar to HMR.
        render = (await vite.ssrLoadModule('/src/entry-server.ts')).render
      } else {
        render = (await import('./dist/server/entry-server.js')).render
      }

      // Render the app HTML. This assumes entry-server.js's exported `render`
      // function calls appropriate framework SSR APIs.
      const { 
        appHtml, 
        statusCode, 
        ctx, 
        preloadLinks, 
        headTags, 
        htmlAttrs
      } = await render(url, manifest, req)

      // Inject the app-rendered HTML into the template.
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
        // Set the response header content type: text/html.
        res.setHeader('Content-Type', 'text/html')

        // Set the response statusCode code: 200, 404, 500, etc.
        res.writeHead(statusCode)

        // 6. Send the rendered HTML back.
        res.end(html)
      }
    } catch (e) {
      vite && vite.ssrFixStacktrace(e)
      console.log(e.stack)
      res.writeHead(500)
      res.end(e.stack)
    }
  })

  const host = 'localhost'
  const port = 3000
  const server = createServer(app)
  server.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}`)
  })
}

bootstrap()

// Basic `connect` example:
// var app = connect()

// // respond to all requests
// app.use(function(req, res){
//   res.end('Hello from Connect!\n')
// })

// //create node.js http server and listen on port
// createServer(app).listen(3000)
