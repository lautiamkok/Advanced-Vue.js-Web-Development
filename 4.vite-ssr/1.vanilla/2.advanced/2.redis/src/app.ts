'use strict'

import http from 'http'
import router from '@/router'

const requestListener: http.RequestListener = (req, res) => {
  // Enable CORS before the router is started.
  
  // Set the website that is allowed to connect. Use `*` to allow any website.
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  // res.setHeader('Access-Control-Allow-Origin', import.meta.env.VITE_CROSS_ORIGIN)

  // Request methods you wish to allow: GET, POST, OPTIONS, PUT, PATCH, DELETE.
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

  // Request headers you wish to allow. Add `Access-Control-Allow-Credentials`
  // to allow cookie in the request headers.
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Credentials')

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)

  // Set default statusCode code and content type.
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  
  // Don't run the router if the request method is 'OPTIONS'.
  if (req.method === 'OPTIONS') {
    res.end()
  } else {
    // Start the router and register routes.
    router.lookup(req, res)
  }
}

if (import.meta.env.PROD) {
  const host = import.meta.env.VITE_APP_HOST || '127.0.0.1'
  const port = import.meta.env.VITE_APP_PORT || '5000'
  const server = http.createServer(requestListener)
  server.listen(port, () => {
    console.log(`🚀 Server ready at ${host}:${port}`)
  })
}

export const viteNodeApp = requestListener
