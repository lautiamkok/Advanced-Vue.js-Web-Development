'use strict'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createServer } from 'node:http'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const resolve = (p) => path.resolve(__dirname, p)

const port = 3636
const host = 'localhost'
const stack = []

function handleStack (req, res) {
  var index = 0
  function next() {
    // Next callback.
    var layer = stack[index++]

    // Call the layer handle.
    layer.handle(req, res, next)
  }
  next()
}

async function finalHandler (req, res) {
  const url = req.url

  const template = fs.readFileSync(
    path.resolve(__dirname, 'index.html'),
    'utf-8'
  )
  await vite.transformIndexHtml(url, template)
  
  const render = (await vite.ssrLoadModule('/src/entry-server.ts')).render
  const { 
    appHtml, 
    preloadLinks, 
    statusCode 
  } = await render(url, {})
  
  const html = template
    .replace(`{{ preloadLinks }}`, preloadLinks)
    .replace(`{{ appHtml }}`, appHtml)

  res.setHeader('Content-Type', 'text/html')
  res.writeHead(statusCode)
  res.end(html)
}

const vite = await (await import('vite')).createServer({
  server: { middlewareMode: true },
  appType: 'custom'
})

// Use vite's connect instance as middleware.
stack.push({ handle: (req, res, next) => {
    vite.middlewares.handle(req, res, next)
  }
})

const requestListener = async function (req, res) {
  stack.push({ handle: finalHandler })
  handleStack(req, res)
}

const server = createServer(requestListener)
server.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`)
})
