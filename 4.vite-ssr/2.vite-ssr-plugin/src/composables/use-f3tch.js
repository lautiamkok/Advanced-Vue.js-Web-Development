// https://github.com/unjs/ofetch
import { ofetch } from 'ofetch'

export default async (path, options) => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

  let data = null
  let error = false

  // Fetch the data and catch errors.
  try {
    data = await ofetch(apiBaseUrl + path, options)
  } catch(err) {
    // Catch "ERR_CONNECTION_REFUSED" here and throw it upwards.
    if (!err.data) {
      throw new Error('No network!')
    }
    error = err
  }
  return { data, error }
}
