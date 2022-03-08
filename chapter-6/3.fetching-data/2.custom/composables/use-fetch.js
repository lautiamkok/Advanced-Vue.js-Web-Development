import { isEmpty } from '@/modules/utils'

export default async function(path, options) {
  // https://v3.nuxtjs.org/docs/usage/runtime-config#environment-variables
  const config = useRuntimeConfig()
  const apiBaseUrl = config.BASE_URL

  // Fetch the data.
  const response = await fetch(apiBaseUrl + path, options)
  const json = await response.json()

  // Set the data: null or json.
  const data = isEmpty(json) ? null : json
  return { data }
}
