'use strict'

async function example1 () {
  return 'example 1'
}

async function example2 () {
  return 'example 2'
}

export { example1, example2 }
// or:
// module.exports = { example1, example2 }

// Or:
// export const example1 = async () => {
//    return 'example 1'
// }

// export const example2 = async () => {
//    return 'example 2'
// }

// Or:
// export default {
//   async example1 () {
//     return 'example 1'
//   },
//   async example2 () {
//     return 'example 2'
//   }
// }
