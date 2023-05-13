'use strict'

export default (options) => {
  function get (name, cookie) {
    const resource = cookie ?? document.cookie
    
    let string = resource.match(`(?:(?:^|.*; *)${name} *= *([^;]*).*$)|^.*$`)[1]
    if (string) {
      string = decodeURIComponent(string)
    }
    if (string === 'undefined' || string === undefined) {
      string = null
    }

    return JSON.parse(string)
  }

  function set (name, value) {
    // If options contains maxAge then we're configuring max-age.
    if (options.maxAge) {
      options['max-age'] = options.maxAge

      // Deleting maxAge from options to pass remaining options to cookie settings.
      delete options.maxAge 
    }

    // If options contains days then we're configuring max-age.
    if (options.days) {
      options['max-age'] = options.days * 60 * 60 * 24

      // Delete days from options to pass remaining options to cookie settings.
      delete options.days 
    }

    // Configuring options to cookie standard by reducing each property.
    options = Object.entries(options).reduce(
      (accumulatedStr, [k, v]) => `${accumulatedStr}; ${k}=${v}`, ''
    )

    // Finally, creating the key.
    document.cookie = name + '=' + encodeURIComponent(value) + options
  }

  function drop (name, options) {
    // Path & domain must match cookie being deleted.
    set(name, '', {'max-age': -1, ...options}) 
  }

  // observe, eye, spy, note, track, follow, guard, study, mark, monitor.
  function observe (ref, name) {
    // https://vuejs.org/api/reactivity-core.html#watch
    watch(ref, (newVal, prevVal) => {
      // Uncomment to see the result.
      // console.log('newVal =', newVal)
      // console.log('count.value =', count.value)

      // Stringify the reactive object before storing.
      set(name, JSON.stringify(ref.value))
    }, {
      // Force deep traversal of the source if it is an object, so that the
      // callback fires on deep mutations.
      deep: true
    })
  }

  return {
    get,
    set,
    drop,
    observe
  }
}
