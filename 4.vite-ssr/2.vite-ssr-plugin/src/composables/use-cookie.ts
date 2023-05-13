'use strict'

export default (options) => {
  function get (name, cookie) {
    const resource = cookie ?? document.cookie
    
    let string = resource.match(`(?:(?:^|.*; *)${name} *= *([^;]*).*$)|^.*$`)[1]
    if (string) {
      string = decodeURIComponent(string)
    }
    if (string === 'undefined' 
      || string === undefined 
      || string === ''
    ) {
      string = null
    }

    return JSON.parse(string)
  }

  function set (name, value) {
    let maxAge = 0
    
    // If options contains maxAge then we're configuring max-age.
    if (options.maxAge) {
      maxAge = options.maxAge
    }

    // If options contains days then we're configuring max-age.
    if (options.days) {
      maxAge = options.days * 60 * 60 * 24
    }

    // Finally, creating the key. Must set `path=/` in the cookie or Firefox
    // won't remove the expired cookie automatically until the browser is
    // closed.
    document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/`
  }

  function drop (name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
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
