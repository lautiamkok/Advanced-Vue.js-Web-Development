'use strict'

import throwError from './throw-error'

// Check if object/ array is empty. Will return true if empty.
// Object.entries({}).length === 0
export default (data) => {
  // Check array.
  if (Array.isArray(data)) {
    return !data.length
  }

  // Check object.
  if (
    typeof data === 'object' &&
    !Array.isArray(data) &&
    data !== null
  ) {
    return !Object.entries(data).length
  }

  throwError(`"${data}" is not an object or array`, 500)
}
