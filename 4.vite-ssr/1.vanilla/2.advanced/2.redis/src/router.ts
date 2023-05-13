'use strict'

import fs from 'fs'
import findmyway from 'find-my-way'

// Import routes.
import index from '@/routes/index'
import cartById from '@/routes/carts/id'
import cartCreate from '@/routes/carts/create'

// https://github.com/delvedor/find-my-way
const router = findmyway()

// http://localhost:5000
router.on('GET', '/', async (req, res) => {

  const ctx = { 
    req, 
    message: 'Hello World!!' 
  }
  const { data, statusCode } = await index(ctx)
  res.statusCode = statusCode
  res.end(data)
})

// http://localhost:5000/carts/id
router.on('GET', '/carts/:id', async (req, res, params) => {
  const ctx = { req, params }
  const { data, statusCode } = await cartById(ctx)
  res.statusCode = statusCode
  res.end(data)
})

// POST http://localhost:5000/carts/create
router.on('POST', '/carts/create', async (req, res) => {
  const ctx = { req }
  const { data, statusCode } = await cartCreate(ctx)
  res.statusCode = statusCode
  res.end(data)
})

// Serve static files on /public route only with the `/public/*` setting. Also
// can be on any route, e.g. `/contents` with the `/*` setting. Examples:
// http://localhost:5000/public/R0003515.jpg
// http://localhost:5000/public/世界/R0003515.jpg
// http://localhost:5000/public/fixtures/hello.txt
router.on('GET', '/public/*', (req, res) => {
  // Use `decodeURIComponent` to decode non-English characters in the URL.
  fs.readFile(`./${decodeURIComponent(req.url)}`, (err, data) => {
    if (err) {
      res.statusCode = 404
      res.end(JSON.stringify({
        message: 'File not found or you made an invalid request.',
        data: err
      }))
      return
    }
    res.setHeader('Content-Type', 'text/plain')
    res.end(data)
  })
})

router.on('GET', '*', (req, res) => {
  res.statusCode = 404
  res.end('{"message":"page not found!"}')
})

export default router
