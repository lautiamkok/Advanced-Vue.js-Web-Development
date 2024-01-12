'use strict'

// Vue server-side rendering (SSR).
// https://vitejs.dev/guide/ssr.html
// https://vuejs.org/guide/scaling-up/ssr.html
// https://github.com/vitejs/vite/tree/main/packages/playground/ssr-vue
const fs = require('fs')
const path = require('path')
const express = require('express')
const { createServer: createViteServer } = require('vite')

async function createServer() {
  const app = express()
  const isProduction = process.env.NODE_ENV === 'production'
  const isWordPress = process.env.NODE_PROD === 'wordpress'

  // Create Vite server in middleware mode. This disables Vite's own HTML
  // serving logic and let the parent server take control.
  //
  // In middleware mode, if you want to use Vite's own HTML serving logic
  // use `'html'` as the `middlewareMode` (ref https://vitejs.dev/config/#server-middlewaremode)
  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' }
  })
  // Use vite's connect instance as middleware
  app.use(vite.middlewares)

  app.use('*', async (req, res, next) => {
    // Serve index.html...

    // Get the request URL, e.g. /about
    const url = req.originalUrl

    try {
      // 1. Read index.html
      let template
      if (!isProduction) {
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
      if (!isProduction) {
        render = (await vite.ssrLoadModule('/src/entry-server.js')).render
      } else {
        render = require('./dist/server/entry-server.js').render
      }

      // 4. Render the app HTML. This assumes entry-server.js's exported `render`
      //    function calls appropriate framework SSR APIs,
      //    e.g. ReactDOMServer.renderToString()
      const appHtml = await render(url)

      // 5. Inject the app-rendered HTML into the template.
      const html = template.replace(`<!--ssr-outlet-->`, appHtml)

      // 6. Send the rendered HTML back.
      if (!isWordPress) {
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
      } else {
        res.status(200).json({
          appHtml
        })
      }

    } catch (e) {
      // If an error is caught, let Vite fix the stack trace so it maps back to
      // your actual source code.
      vite.ssrFixStacktrace(e)
      next(e)
    }
  })

  app.listen(3000)
}

createServer()
