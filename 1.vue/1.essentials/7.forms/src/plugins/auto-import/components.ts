'use strict'

// Use globalThis or unimport plugin to auto import utils.
// import isEmptyObject from '@/utils/is-empty-object'
// import pascalCase from '@/utils/pascal-case'

// https://vuejs.org/guide/reusability/plugins.html#writing-a-plugin
export default {
  install: (app, options) => {
    // `glob` only can except static string. No dynamic string.
    const modules = import.meta.glob('/src/components/auto-import/**', { eager: true })

    // Stop here if the object is empty.
    if (isEmptyObject(modules)) {
      return
    }

    let array = []
    let dirname = null

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

    // Loop components and install them with pascalCase name.
    Object.entries(modules).forEach(([path, module]) => {
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

      // Register the module with the pascalCase name.
      app.component(name, module.default)
    })
  }
}
