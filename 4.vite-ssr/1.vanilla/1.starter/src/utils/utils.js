'use strict'

// Camalize strings.
// Ref:
// https://stackoverflow.com/a/4068586/413225
export function camalize (str) {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
}

export function pascalize (str) {
  str = camalize(str)
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function throwError (err) {
  const error = new Error(err)
  error.status = err.status || 500
  error.message = err.data ? err.data.message : err.message
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

  throwError(`"${data}" is not an object or array`, 500)
}

// Promisise setTimeout.
// Usage:
// await delay(500)
export async function delay (ms) {
  return new Promise(res => {
    setTimeout(res, ms)
  })
}
