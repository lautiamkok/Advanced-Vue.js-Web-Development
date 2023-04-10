'use strict'

// Camalize strings.
// Ref:
// https://stackoverflow.com/a/4068586/413225
export function camalCase (str) {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
}

export function pascalCase (str) {
  str = camalCase(str)
  return str.charAt(0).toUpperCase() + str.slice(1)
}
