'use strict'

export default (file) => {
  if (!file) {
    return
  }
  return '/static/' + file
}
