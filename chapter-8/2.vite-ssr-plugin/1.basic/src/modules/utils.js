'use strict'

const baseUrl = import.meta.env.BASE_URL

function getAsset (file) {
  if (!file) {
    return
  }
  const images = import.meta.globEager('/src/assets/images/*.{jpg,png,svg}')
  return images[`${baseUrl}src/assets/images/${file}`].default
}

function getStatic (file) {
  if (!file) {
    return
  }
  return '/static/' + file
}

function throwError (message = '', statusCode = '') {
  const error = new Error(message)
  error.statusCode = statusCode
  throw error
}

// Check if object/ array is empty. Will return true if empty.
// Object.entries({}).length === 0
// https://stackoverflow.com/a/66032827/413225
// https://stackoverflow.com/a/53968232/413225
function isEmpty (data) {
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

export {
  getAsset,
  getStatic,
  throwError,
  isEmpty
}
