'use strict'

// Camalize strings.
// Ref:
// https://stackoverflow.com/a/4068586/413225
export function camalCase (str) {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
}

export function pascalCase (str) {
  str = camalCase(str)
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function createError (options = {}) {
  const error = new Error(options.message)
  error.status = options.status
  error.name = options.name
  throw error
}

// Check if object/ array is empty. Will return true if empty.
// Object.entries({}).length === 0
// https://stackoverflow.com/a/66032827/413225
// https://stackoverflow.com/a/53968232/413225
export function isEmpty (data) {
  // Check array.
  if (Array.isArray(data)) {
    return !data.length
  }

  // Check object.
  if (
    typeof data === 'object' &&
    !Array.isArray(data) &&
    data !== null
  ) {
    return !Object.entries(data).length
  }

  createError({
    status: 500,
    message: `"${data}" is not an object or array`
  })
}

// Promisise setTimeout.
// Usage:
// await delay(500)
export async function delay (ms) {
  return new Promise(res => {
    setTimeout(res, ms)
  })
}

// https://nodejs.bootcss.com/node-request-data/
export async function normalizeBody (req) {
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
