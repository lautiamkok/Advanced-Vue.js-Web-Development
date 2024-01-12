// import { isEmpty } from '@/modules/utils'

// Or, use Lodash instead.
// https://lodash.com/docs/4.17.15#isEmpty
import { isEmpty } from 'lodash'

export default async function(path, options) {
  const apiBaseUrl = import.meta.env.VITE_REMOTE_API_BASE_URL

  // Fetch the data.
  const response = await fetch(apiBaseUrl + path, options)
  const json = await response.json()

  // Set the data: null or json.
  const data = isEmpty(json) ? null : json
  return { data }
}
