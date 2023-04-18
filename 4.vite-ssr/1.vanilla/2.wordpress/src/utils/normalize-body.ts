'use strict'

// https://nodejs.bootcss.com/node-request-data/
export default async (req) => {
  let body = []
  const requestMethods = ['PATCH', 'POST', 'PUT', 'DELETE']
  if (requestMethods.includes(req.method)) {
    for await (const chunk of req) {
      body += chunk
    }

    if (req.headers['content-type']?.includes('application/json')) {
      body = JSON.parse(body)
    }
  }

  return body
}
