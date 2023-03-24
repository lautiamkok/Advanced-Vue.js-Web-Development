export function useA () {
  return 'a'
}

function useB () {
  return 'b'
}

function useC () {
  return 'c'
}

export const useD = () => {
  return 'd'
}

export { useB, useC }

export default function () {
  // Just like plugins, composables can access the data from Nuxt config file.
  const runtimeConfig = useRuntimeConfig()
  const apiBaseUrl = runtimeConfig.apiBaseUrl
  return apiBaseUrl
}
