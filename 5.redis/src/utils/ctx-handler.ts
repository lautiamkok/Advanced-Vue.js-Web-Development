'use strict'

// Normalize response data and any error that has been caught in the try-catch
// block.
export default (callback) => {
  return async ctx => {
    let data = null
    let statusCode = 200
    try {
      data = await callback(ctx)
    } catch (e) {
      statusCode = e.statusCode || 500
      data = {
        name: e.name,
        message: e.message,
        stack: e.stack
      }
    }
    data = JSON.stringify(data)
    
    return {
      statusCode,
      data
    }
  }
}
