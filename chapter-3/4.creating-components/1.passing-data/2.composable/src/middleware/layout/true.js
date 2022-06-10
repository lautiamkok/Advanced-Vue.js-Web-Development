'use strict'

export default async (to, from, next) => {
  to.meta.layout = true
  next()
}
