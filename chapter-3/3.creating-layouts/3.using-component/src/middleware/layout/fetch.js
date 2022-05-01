'use strict'

const apiBaseUrl = import.meta.env.VITE_REMOTE_API_BASE_URL

export default async (to, from, next) => {
  // Get the slug from meta or params.
  let slug = to.params.slug ? to.params.slug : undefined
  if (to.meta.slug) {
    slug = to.meta.slug
  }
  if (slug === undefined) {
    return next()
  }

  // Fetch data from the API. In a complex app, should create a separate API
  // route for querying the layout info only, instead of querying the entire
  // data of a page.
  const response = await fetch(`${apiBaseUrl}/layouts/layouts__${slug}`)
  const data = await response.json()

  // Inject data to the route meta then you can access from the component.
  to.meta.layout = data.layout

  // Pass the middleware queue to the next middleware.
  next()
}
