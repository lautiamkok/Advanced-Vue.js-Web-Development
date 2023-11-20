'use strict'

import camelCase from './camel-case'

export default () => {
  const utils = import.meta.globEager('./**')
  
  Object.entries(utils).forEach(([path, util]) => {
    let name = path
      .split('/')
      .pop()
      .replace(/\.\w+$/, '')
    name = camelCase(name)
    globalThis[name] = util.default
  })
}
