'use strict'

// Use globalThis or unimport plugin to auto import utils.
// import isEmptyObject from '@/utils/is-empty-object'
// import camelCase from '@/utils/camel-case'

// https://vuejs.org/guide/reusability/plugins.html#writing-a-plugin
export default {
  install: (app, options) => {
    // `glob` only can except static string. No dynamic string.
    const modules = import.meta.glob('/src/composables/auto-import/**', { eager: true })

    // Stop here if the object is empty.
    if (isEmptyObject(modules)) {
      return
    }

    // Loop modules and install them with camelCase name.
    Object.entries(modules).forEach(([path, module]) => {
      let name = path
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
      name = camelCase(name)
      app.config.globalProperties[name] = module.default

      // Register modules to the global object as well.
      globalThis[name] = module.default
    })
  }
}
