'use strict'

import camelCase from './camel-case'

export default () => {
  const modules = import.meta.glob('./**', { eager: true })
  
  Object.entries(modules).forEach(([path, module]) => {
    let name = path
      .split('/')
      .pop()
      .replace(/\.\w+$/, '')
    name = camelCase(name)
    globalThis[name] = module.default
  })
}
