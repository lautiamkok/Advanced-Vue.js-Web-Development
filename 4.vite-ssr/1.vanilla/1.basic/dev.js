'use strict'

import { createServer } from 'node:http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const resolve = (p) => path.resolve(__dirname, p)

const port = 3000
const host = 'localhost'

const vite = await (await import('vite')).createServer({
  server: { middlewareMode: true },
  appType: 'custom'
})

const requestListener = async function (req, res) {
  const url = req.url

  const template = fs.readFileSync(
    path.resolve(__dirname, 'index.html'),
    'utf-8'
  )
  
  if (vite.middlewares) {
    await new Promise((resolve) =>
      vite.middlewares(req, res, resolve)
    )
  }
  await vite.transformIndexHtml(url, template)
  
  const render = (await vite.ssrLoadModule('/src/entry-server.ts')).render
  const { 
    appHtml, 
    preloadLinks, 
    statusCode 
  } = await render(url)
  
  const html = template
    .replace(`{{ preloadLinks }}`, preloadLinks)
    .replace(`{{ appHtml }}`, appHtml)

  res.setHeader('Content-Type', 'text/html')
  res.writeHead(statusCode)
  res.end(html)
}

const server = createServer(requestListener)
server.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`)
})
