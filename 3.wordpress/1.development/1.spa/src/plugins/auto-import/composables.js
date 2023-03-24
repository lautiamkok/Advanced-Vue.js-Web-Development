'use strict'

// https://vuejs.org/guide/reusability/plugins.html#writing-a-plugin
export default {
  install: (app, options) => {
    // `globEager` only can except static string. No dynamic string.
    const composables = import.meta.globEager('/src/composables/auto-import/**')

    // Loop composables and install them with camalized method name.
    Object.entries(composables).forEach(([path, composable]) => {
      let name = path
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
      name = camalize(name)
      app.config.globalProperties[name] = composable.default
    })
  }
}
