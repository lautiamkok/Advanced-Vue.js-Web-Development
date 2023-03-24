'use strict'

// Must put the shared states outside the export block.
const raw = ref(false)
const skip = ref(false)

export default (req = null) => {
  // Standardise the error data from the raw error data.
  const error = computed(() => {
    let computedError = false
    if (raw.value) {
      computedError = {
        status: raw.value.status || 500,
        name: raw.value.name || 'Internal Server Error',
        message: raw.value.message,
        stack: raw.value.stack,
        final: raw.value.final
      }
    }

    // Client side only.
    if (!import.meta.env.SSR && !skip.value) {
      const errorClient = window.context.error
      // Use `Object.keys` to make sure the error is not empty, or use `JSON.stringify`:
      // Object.keys(obj).length === 0 // true => empty
      // JSON.stringify(obj) === '{}' // true => empty
      if (window.context.error && JSON.stringify(errorClient) !== '{}') {
        computedError = errorClient
      }
    }
    
    return computedError
  })

  // Server side.
  if (import.meta.env.SSR && req) {
    // Un-comment to see the log.
    // const string = req.headers.cookie
    // const array = string.split('; ')
    // console.log('array =', array)
    // console.log('headers =', req.headers)
    // console.log('req.method =', req.method)

    // Clear the stored error data.
    if (req.method === 'POST' && req.headers['x-clear-error']) {
      raw.value = false
      console.log('Error cleared')

      // Un-comment to see the log.
      // console.log(`x-clear-error =`, req.headers['x-clear-error'])
    }

    // Un-comment to see the log.
    // console.log('error =', error.value)
  }

  return {
    raw,
    error,
    skip
  }
}
