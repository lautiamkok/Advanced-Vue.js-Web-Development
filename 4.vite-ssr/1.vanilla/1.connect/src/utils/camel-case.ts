'use strict'

// Camalize strings.
// Ref:
// https://stackoverflow.com/a/4068586/413225
export default (str) => {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
}
