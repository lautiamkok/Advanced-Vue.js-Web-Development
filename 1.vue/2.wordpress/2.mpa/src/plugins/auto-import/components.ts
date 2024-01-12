'use strict'

// import pascalCase from '@/utils/pascal-case'

// https://vuejs.org/guide/reusability/plugins.html#writing-a-plugin
export default {
  install: (app, options) => {
    // `glob` only can except static string. No dynamic string.
    const modules = import.meta.glob('/src/components/auto-import/**', { eager: true })

    // Install components.
    registerComponents(app, modules)
  }
}

export const installGlobalComponents = {
  install: (app, options) => {
    const modules = import.meta.glob('/src/components/auto-import/global/**', { eager: true })
    registerComponents(app, modules)
  }
}

export const installIndexPageComponents = {
  install: (app, options) => {
    const modules = import.meta.glob('/src/components/auto-import/index/**', { eager: true })
    registerComponents(app, modules)
  }
}

export const installAboutPageComponents = {
  install: (app, options) => {
    const modules = import.meta.glob('/src/components/auto-import/about/**', { eager: true })
    registerComponents(app, modules)
  }
}

function registerComponents (app, modules) {
  let array = []
  let dirname = null

  // Stop here if the object is empty.
  if (isEmptyObject(modules)) {
    return
  }

  // Loop modules and create pairs with a length count.
  Object.entries(modules).forEach(([path, module]) => {
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
  
  // Loop components and install them with camelCase name.
  Object.entries(modules).forEach(([path, module]) => {
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

    // Register the module with the pascalCase name.
    app.component(name, module.default)
  })
}
