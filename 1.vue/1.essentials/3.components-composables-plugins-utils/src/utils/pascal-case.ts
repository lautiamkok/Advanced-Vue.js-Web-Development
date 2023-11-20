'use strict'

// Use globalThis or unimport plugin to auto import utils.
// import camelCase from './camel-case'

export default (str) => {
  str = camelCase(str)
  return str.charAt(0).toUpperCase() + str.slice(1)
}
