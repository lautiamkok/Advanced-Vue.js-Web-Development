// https://nuxt.com/docs/guide/directory-structure/plugins
export default defineNuxtPlugin(nuxtApp => {
  // You must register this in the Nuxt config file if the code is executed
  // outside the `provide` plugin helper.
  console.log('server only')
})
