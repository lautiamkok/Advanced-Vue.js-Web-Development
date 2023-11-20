'use strict'

// Use globalThis or unimport plugin to auto import utils.
// import isEmptyObject from '@/utils/is-empty-object'
// import camelCase from '@/utils/camel-case'

// https://vuejs.org/guide/reusability/plugins.html#writing-a-plugin
export default {
  install: (app, options) => {
    // `globEager` only can except static string. No dynamic string.
    const composables = import.meta.globEager('/src/composables/auto-import/**')

    // Stop here if the object is empty.
    if (isEmptyObject(composables)) {
      return
    }

    // Loop composables and install them with camelCase name.
    Object.entries(composables).forEach(([path, composable]) => {
      let name = path
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
      name = camelCase(name)
      app.config.globalProperties[name] = composable.default

      // Register composables to the global object as well.
      globalThis[name] = composable.default
    })
  }
}
