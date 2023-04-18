'use strict'

// Must put the shared states outside the export block.
const error = ref(false)

export default (req = null) => {
  // Server side only.
  if (import.meta.env.SSR && req) {
    // Un-comment to see the log.
    // console.log('headers =', req.headers)
    // console.log('req.method =', req.method)
    // console.log('req.url =', req.url)

    // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
    const url = req.url
    const string = url.substring(url.indexOf('?'))
    const params = new URLSearchParams(string)

    // Clear the "stored" error data on the server side.
    if (params.has('error') && params.get('error') === 'delete') {
      error.value = false
      console.log('Error cleared')
    }
    // Un-comment to see the log.
    // console.log('error =', error.value)
  }

  function normalizeError (err) {
    return {
      statusCode: err.statusCode || 500,
      name: err.name || 'Internal Server Error',
      message: err.message,
      stack: err.stack
    }
  }

  return {
    error,
    normalizeError
  }
}
