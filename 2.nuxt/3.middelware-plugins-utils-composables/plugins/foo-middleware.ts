// https://nuxt.com/docs/api/utils/add-route-middleware#global-route-middleware
export default defineNuxtPlugin(nuxtApp => {
  addRouteMiddleware('global-foo', (to, from) => {
      console.log('global middleware from `/plugin/` that runs on every route change')
    }, 
    { global: true }
  )

  addRouteMiddleware('named-foo', () => {
    console.log('named middleware from `/plugin/` that runs only when it has been used')
  })
})
