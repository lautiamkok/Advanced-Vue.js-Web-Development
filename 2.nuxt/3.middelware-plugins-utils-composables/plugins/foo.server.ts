// https://nuxt.com/docs/guide/directory-structure/plugins
export default defineNuxtPlugin(nuxtApp => {
  // Plugins here automatically can be executed on the server side only. No need
  // to register them in the Nuxt config file.
  return {
    provide: {
      hello: (name: string) => `Hello, ${name}!`
    }
  }
})
