// Note that Node.js hasn't implemented the fetch() method, so
// install external modules: npm i cross-fetch
// https://github.com/lquixada/cross-fetch
import fetch from 'cross-fetch'

import { isEmpty } from '@/modules/utils'

export default async function(path, options) {
  const apiBaseUrl = import.meta.env.VITE_REMOTE_API_BASE_URL

  // Fetch the data.
  const response = await fetch(apiBaseUrl + path, options)
  const json = await response.json()

  const error = response.status === 200 ? false : true
  const message = response.status === 200 ? null : json
  const status = response.status

  // Set the data: null or json.
  const data = isEmpty(json) || error ? null : json
  return { data, error, message, status }
}
