'use strict'

// https://vuejs.org/guide/reusability/plugins.html#writing-a-plugin
export default {
  install: (app, options) => {
    // `globEager` only can except static string. No dynamic string.
    const components = import.meta.globEager('/src/components/auto-import/index/**')

    // Loop components and install them with camalized method name.
    Object.entries(components).forEach(([path, component]) => {
      // Remove '/src/components/auto-import/' from string first.
      let name = path
        .split('/src/components/auto-import/index/')
        .pop()

      // Replace `/` with `-`.s
      name = name
        .replace(/\//, '-')
        .replace(/\.\w+$/, '')
      
      // Pascalise the string.
      name = pascalize(name)

      // Register the component with the pascalized name.
      app.component(name, component.default)
    })
  }
}
