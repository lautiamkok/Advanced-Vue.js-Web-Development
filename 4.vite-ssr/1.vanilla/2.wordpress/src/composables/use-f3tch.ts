'use strict'

export default async (path, options = {}) => {
  let error = false
  let data = null
  let res = null
  const baseURL = options.baseURL ?? import.meta.env.VITE_API_BASE_URL

  // Stringify body and adding a json content-type before sending.
  if (options.body) {
    options.body = JSON.stringify(options.body)
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
    throw Error(err)
  }

  // Get the response body in text.
  const text = await res.text()

  // Parse response body. Don't parse if it is a string of plain text only,
  // e.g. 'not found'.
  if (isJson(text)) {
    data = JSON.parse(text)
  }

  // `null` is also a valid json. So make sure `data` is not `null`.
  if (data) {
    data = data.data ?? data
  }
  
  // Handle 404, 400, 500, etc. Set default error data.
  if (!res.ok) {
    error = {
      statusCode: res.status,
      statusText: res.statusText,
      name: res.statusText,
      message: `${res.statusText} ${res.url}`
    }
  }

  // If `data` is a json, override the following error default data keys:
  if (data && error) {
    error.name = data.name ?? error.name
    error.message = data.message ?? error.message
  }

  // Reset `data`.
  if (error) {
    data = null
  }

  return { data, error }
}
