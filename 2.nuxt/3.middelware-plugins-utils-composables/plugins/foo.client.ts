// https://nuxt.com/docs/guide/directory-structure/plugins If you want to make a
export default defineNuxtPlugin(nuxtApp => {
  // Plugins here automatically can be executed on the client side only. No need
  // to register them in the Nuxt config file.
  return {
    provide: {
      hi: (name: string) => `Hi, ${name}!`
    }
  }
})
