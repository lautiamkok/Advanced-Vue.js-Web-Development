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
  isProd = process.env.NODE_ENV === 'production'
) {
  // https://github.com/senchalabs/connect
  const app = connect()

  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so parent server
  // can take control
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  // Use vite's connect instance as middleware
  // If you use your own express router (express.Router()), you should use router.use
  app.use(vite.middlewares)

  app.use(async (req, res) => {
    const url = req.url

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
      render = (await vite.ssrLoadModule('/src/entry-server.ts')).render
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
      statusCode, 
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

    res.setHeader('Content-Type', 'text/html')
    res.writeHead(statusCode)
    res.end(html)
  })

  const host = 'localhost'
  const port = 3000
  const server = createServer(app)
  server.listen(port, host, () => {
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
