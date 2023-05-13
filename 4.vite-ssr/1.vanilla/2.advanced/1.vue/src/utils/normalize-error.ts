'use strict'

export default (err) => {
  return {
    statusCode: err.statusCode || 500,
    name: err.name || 'Internal Server Error',
    path: err.path,
    message: err.message,
    stack: err.stack
  }
}
