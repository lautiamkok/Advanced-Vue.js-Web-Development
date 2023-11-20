'use strict'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createServer } from 'node:http'

// import cartById from './src/api-bin/carts/id.js'
// import cartCreate from './src/api-bin/carts/create/index.js'

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

  // if (url.includes('/api') && req.method === 'GET') {
  //   const id = url.split('/api/carts/').pop()
  //   const data = await cartById(req, res, id)
  //   res.setHeader('Content-Type', 'application/json')
  //   res.writeHead(200)
  //   res.end(JSON.stringify(data))
  //   return
  // } 

  // if (url.includes('/api') && req.method === 'POST') {
  //   const data = await cartCreate(req, res)
  //   res.setHeader('Content-Type', 'application/json')
  //   res.writeHead(200)
  //   res.end(JSON.stringify(data))
  //   return
  // } 

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
    statusCode, 
    ctx, 
    preloadLinks, 
    headTags, 
    htmlAttrs
  } = await render(url, {
    req,
    res
  })
  
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
}

const server = createServer(requestListener)
server.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`)
})
