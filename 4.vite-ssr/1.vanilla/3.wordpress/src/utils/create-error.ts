'use strict'

export default (options = {}) => {
  const error = new Error(options.message)
  error.statusCode = options.statusCode
  error.name = options.name
  throw error
}
