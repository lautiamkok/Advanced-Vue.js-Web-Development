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
  let array = []
  let dirname = null

  // Loop components and create pairs with a length count.
  Object.entries(components).forEach(([path, component]) => {
    const length = path.split('/').length
    array.push({ path, length })
  })

  // Get the pair has the lowest value in its `length` key.
  const lowest = array.reduce((previous, current) => {
    return current.length < previous.length ? current : previous;
  })

  // Find the entry dirname dynamically, which is `/src/components/auto-import/`.
  const file = lowest.path.split('/').pop()
  dirname = lowest.path.split(file)[0]
  
  // Loop components and install them with camalCase name.
  Object.entries(components).forEach(([path, component]) => {
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
    name = pascalCase(name)

    // Register the component with the pascalCase name.
    app.component(name, component.default)
  })
}
