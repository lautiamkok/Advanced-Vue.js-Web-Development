'use strict'

import axios from 'axios'

export default async (to, from, next) => {
  // Get the slug from meta or params.
  let slug = to.params.slug ? to.params.slug : undefined
  if (to.meta.slug) {
    slug = to.meta.slug
  }
  if (slug === undefined) {
    return next()
  }

  const apiBaseUrl = import.meta.env.VITE_REMOTE_API_BASE_URL
  const { data } = await axios.get(`${apiBaseUrl}/layouts/layouts__${slug}`)
  to.meta.layout = data.layout
  next()
}
