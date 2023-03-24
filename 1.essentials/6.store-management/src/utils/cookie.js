'use strict'

// Reference: 
// https://stackoverflow.com/a/48706852/413225
// https://stackoverflow.com/a/11344672/413225
// https://developer.mozilla.org/en-US/docs/Web/API/document/cookie

export default class Cookie {
  constructor (options) {
    this.options = options || {}
  }

  get (name, cookie = null) {
    // If the cookie source is not provided, then take it from `document`.
    const resource = cookie ? cookie : document.cookie

    let string = resource.match(`(?:(?:^|.*; *)${name} *= *([^;]*).*$)|^.*$`)[1]
    if (string) {
      return decodeURIComponent(string)
    }
  }

  set (name, value) {
    let options = this.options || {}

    // If options contains maxAge then we're configuring max-age.
    if (options.maxAge) {
      options['max-age'] = options.maxAge

      // Deleting maxAge from options to pass remaining options to cookie settings.
      delete options.maxAge 
    }

    // If options contains days then we're configuring max-age.
    if (options.days) {
      options['max-age'] = options.days * 60 * 60 * 24

      // Deleting days from options to pass remaining options to cookie settings.
      delete options.days 
    }

    // Configuring options to cookie standard by reducing each property.
    options = Object.entries(options).reduce(
      (accumulatedStr, [k, v]) => `${accumulatedStr}; ${k}=${v}`, ''
    )

    // Finally, creating the key.
    document.cookie = name + '=' + encodeURIComponent(value) + options
  }

  drop (name, options) {
    // Path & domain must match cookie being deleted.
    set(name, '', {'max-age': -1, ...options}) 
  }
}
