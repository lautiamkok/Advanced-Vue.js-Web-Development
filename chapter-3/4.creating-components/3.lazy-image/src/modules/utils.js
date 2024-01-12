'use strict'

const baseUrl = import.meta.env.BASE_URL
const apiBaseUrl = import.meta.env.VITE_REMOTE_API_BASE_URL

function getAsset (file, relativePath) {
  if (!file) {
    return
  }

  // Get image from the `assets` folder.
  const images = import.meta.globEager('/src/assets/images/*.{jpg,png,svg}')
  const image = images[`${baseUrl}src/assets/images/${file}`]
  if (image !== undefined) {
    return image.default
  }

  console.log(`${file} doesn't exist locally!`)

  if (!relativePath) {
    return
  }

  // Get the image from the remote API.
  const array = relativePath.split('/')
  array.pop()
  const path = array.join('/')
  return `${apiBaseUrl}/${path}/${file}`
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

// Use `isNaN` to make sure the string is numberic.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN
function isNum (val){
  return !isNaN(val)
}

export {
  getAsset,
  getStatic,
  throwError,
  isEmpty,
  isNum
}
