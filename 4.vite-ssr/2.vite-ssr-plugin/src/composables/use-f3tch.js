'use strict'

// https://github.com/unjs/ofetch
import { ofetch } from 'ofetch'

export default async (path, options = {}) => {
  let data = null
  options.baseURL = options.baseURL ?? import.meta.env.VITE_API_BASE_URL

  // Fetch the data and catch errors.
  try {
    data = await ofetch(path, options)
  } catch (err) {
    // Catch "ERR_CONNECTION_REFUSED" here and throw it upwards.
    if (!err.data) {
      throw new Error('No network!')
    }
    const error = new Error(err)
    error.status = err.statusCode
    error.name = err.name
    throw error
  }

  data = data.data ?? data
  return { data }
}
