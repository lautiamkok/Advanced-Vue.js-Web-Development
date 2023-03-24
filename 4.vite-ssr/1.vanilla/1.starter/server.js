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
import { 
  createApp, 
  eventHandler, 
  toNodeListener, 
  fromNodeMiddleware, 
  setResponseHeader, 
  setResponseStatus
} from 'h3'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const resolve = (p) => path.resolve(__dirname, p)

async function init (
  isProd = process.env.NODE_ENV === 'production'
) {
  const app = createApp()

  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so parent server
  // can take control
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  // Use vite's connect instance as middleware
  // If you use your own express router (express.Router()), you should use router.use
  app.use(fromNodeMiddleware(vite.middlewares))

  app.use(eventHandler(async event => {
    // Serve index.html as follows:
    const url = event.node.req.url
    const req = event.node.req

    try {
      // 1. Read index.html
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

      // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
      //    also applies HTML transforms from Vite plugins, e.g. global preambles
      //    from @vitejs/plugin-react
      template = await vite.transformIndexHtml(url, template)

      // 3. Load the server entry. vite.ssrLoadModule automatically transforms
      //    your ESM source code to be usable in Node.js! There is no bundling
      //    required, and provides efficient invalidation similar to HMR.
      let render
      if (!isProd) {
        render = (await vite.ssrLoadModule('/src/entry-server.js')).render
      } else {
        render = (await import('./dist/server/entry-server.js')).render
      }

      // 4. Render the app HTML. This assumes entry-server.js's exported `render`
      //    function calls appropriate framework SSR APIs,
      //    e.g. ReactDOMServer.renderToString()
      //    The manifest json is required for preloading assets.
      const manifest = isProd
        ? JSON.parse(
            fs.readFileSync(resolve('dist/client/ssr-manifest.json'), 'utf-8'),
          )
        : {}
      const { 
        appHtml, 
        status, 
        ctx, 
        preloadLinks, 
        headTags, 
        htmlAttrs
      } = await render(url, manifest, req)

      // 5. Inject the app-rendered HTML into the template.
      const ssrContext = `<script>window.context = ${JSON.stringify(ctx)}</script>`
      const html = template
        .replace(`{{ preloadLinks }}`, preloadLinks)
        .replace(`{{ ssrContext }}`, ssrContext)
        .replace(`{{ appHtml }}`, appHtml)
        .replace(`{{ headTags }}`, headTags)
        .replace(`{{ htmlAttrs }}`, htmlAttrs)

      // Set the response header content type: json.
      // https://www.jsdocs.io/package/h3#setResponseHeader
      setResponseHeader(
        event,
        'Content-Type', 
        'text/html'
      )

      // Set the response status code: 200, 404, 500, etc.
      // https://www.jsdocs.io/package/h3#setResponseStatus
      setResponseStatus(event, status)

      // 6. Send the rendered HTML back.
      return html
    } catch (error) {
      // Return the captured error as json.
      const status = error.statusCode || 500
      const name = error.name || 'Internal Server Error'
      const message = error.message || '500 error occurred'
      const stack = error.stack || null
      
      setResponseStatus(event, status)
      return {
        status,
        name,
        message,
        stack
      }
    }
  }))

  const port = 3000
  const server = createServer(toNodeListener(app))
  server.listen(port, () => {
    console.log(`Server started: http://localhost:${port}`)
  })
}

init()
