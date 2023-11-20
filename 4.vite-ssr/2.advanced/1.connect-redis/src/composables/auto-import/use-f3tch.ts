'use strict'

export default async (path, options = {}) => {
  let res = null

  const baseURL = options.baseURL ?? import.meta.env.VITE_API_BASE_URL
  const error = ref(false)
  const data = ref(null)
  // return { data, error }
  
  // Stringify body before sending.
  if (options.body) {
    options.body = JSON.stringify(options.body)
  }

  // Add a default headers with `application/json` content-type if it is not
  // set.
  if (!options.headers) {
    options.headers = { 'Content-Type': 'application/json' }
  }

  // Fetch the data and catch errors.
  try {
    res = await fetch(`${baseURL}${path}`, options)
  } catch (err) {
    // Only network errors are regarded as true errors by Node.js Fetch API.
    // That means errors (e.g. 404, 400, 500) sent by the server are not taken
    // into account. So errors only can be caught here if the user is not
    // connected to the internet or if a networking error occurs. And that you
    // will always get this error `TypeError: TypeError: Failed to fetch`.
    error.value = err
    return { data, error }
  }

  // Get the response body in text.
  const text = await res.text()

  // Parse response body. Don't parse if it is a string of plain text only,
  // e.g. 'not found'.
  const json = isJson(text) ? JSON.parse(text) : null

  // `null` is also a valid json. So make sure `data` is not `null` before
  // looking for the `data` key inside the json data. For example, this `data`
  // key will present in the data returned from the GraphQL query.
  if (json) {
    data.value = json.data ?? json
  }
  
  // Handle 404, 400, 500, etc. Set default error data.
  if (!res.ok) {
    error.value = {
      statusCode: res.status,
      statusText: res.statusText,
      name: res.statusText,
      message: `${res.statusText} ${res.url}`
    }
  }

  // If `data` is a json, override the following error default data keys:
  if (data.value && error.value) {
    error.value.name = data.value.name ?? error.value.name
    error.value.message = data.value.message ?? error.value.message
  }

  // Reset `data`.
  if (error.value) {
    data.value = null
  }

  return { data, error }
}
