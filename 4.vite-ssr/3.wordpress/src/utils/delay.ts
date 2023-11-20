'use strict'

// Promisise setTimeout.
// Usage:
// await delay(500)
export default async (ms) => {
  return new Promise(res => {
    setTimeout(res, ms)
  })
}
