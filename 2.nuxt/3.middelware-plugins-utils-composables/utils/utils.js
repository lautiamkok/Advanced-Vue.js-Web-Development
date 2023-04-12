'use strict'

function doSomething () {
  // Utils can access the data from Nuxt config file.
  const runtimeConfig = useRuntimeConfig()
  return runtimeConfig.public['apiBaseUrl']
}

export {
  doSomething
}