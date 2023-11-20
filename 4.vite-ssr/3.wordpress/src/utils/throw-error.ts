'use strict'

import createError from './create-error'

export default (options = {}) => {
  throw createError(options)
}
