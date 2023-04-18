'use strict'

// Check if a string is a json string or not.
export default (str) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}
