'use strict'

// Must put the shared states outside the export block.
const error = ref(false)

export default (req = null) => {
  function normalizeError (err) {
    return {
      status: err.status || 500,
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
