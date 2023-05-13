'use strict'

export default ctxHandler(ctx => {
  return { 
    message: ctx.message
  }
})

// A long option:
// export default (req, res) => {
//   return {
//     statusCode: 200,
//     data: { 
//       message: 'Hello World!'
//     }
//   }
// }
