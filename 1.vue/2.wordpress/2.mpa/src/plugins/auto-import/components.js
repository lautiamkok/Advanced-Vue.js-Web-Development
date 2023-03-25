'use strict'

// https://vuejs.org/guide/reusability/plugins.html#writing-a-plugin
export default {
  install: (app, options) => {
    // `globEager` only can except static string. No dynamic string.
    const components = import.meta.globEager('/src/components/auto-import/**')

    // Install components.
    registerComponents(app, components)
  }
}

export const installGlobalComponents = {
  install: (app, options) => {
    const components = import.meta.globEager('/src/components/auto-import/global/**')
    registerComponents(app, components)
  }
}

export const installIndexPageComponents = {
  install: (app, options) => {
    const components = import.meta.globEager('/src/components/auto-import/index/**')
    registerComponents(app, components)
  }
}

export const installAboutPageComponents = {
  install: (app, options) => {
    const components = import.meta.globEager('/src/components/auto-import/about/**')
    registerComponents(app, components)
  }
}

function registerComponents (app, components) {
  let dirname = null

  // Loop components and install them with camalized method name.
  Object.entries(components).forEach(([path, component], index) => {
    // Get the top dirname from the first item.
    if (index === 0) {
      const file = path.split('/').pop()
      dirname = path.split(file)[0]
    }

    // Remove the top dirname from string first.
    let name = path
      .split(dirname)
      .pop()

    // Replace all `/` occurrences with `-`.
    // Remove the `.vue` extension.
    name = name
      .replace(/\//g, '-')
      .replace(/\.\w+$/, '')

    // Pascalise the string.
    name = pascalize(name)

    // Register the component with the pascalized name.
    app.component(name, component.default)
  })
}
