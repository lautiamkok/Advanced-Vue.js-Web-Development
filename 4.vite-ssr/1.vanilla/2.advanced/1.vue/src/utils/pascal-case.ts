'use strict'

import camelCase from './camel-case'

export default (str) => {
  str = camelCase(str)
  return str.charAt(0).toUpperCase() + str.slice(1)
}
