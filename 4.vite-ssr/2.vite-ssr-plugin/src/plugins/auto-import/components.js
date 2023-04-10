'use strict'

// https://vuejs.org/guide/reusability/plugins.html#writing-a-plugin
export default {
  install: (app, options) => {
    // `globEager` only can except static string. No dynamic string.
    const components = import.meta.globEager('/src/components/auto-import/**')

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
      // Remove '/src/components/auto-import/' from string first.
      let name = path
        .split(dirname)
        .pop()

      // Replace `/` with `-`.s
      name = name
        .replace(/\//g, '-')
        .replace(/\.\w+$/, '')
      
      // Pascalise the string.
      name = pascalCase(name)

      // Register the component with the pascalCase name.
      app.component(name, component.default)
    })
  }
}
