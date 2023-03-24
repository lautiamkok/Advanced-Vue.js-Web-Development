// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // The private keys which are only available server-side
    // apiSecret: '123',
    // Keys within public are also exposed client-side
    public: {
      apiBaseUrl: process.env.API_BASE_URL
    },

    // No need to register your plugins if their code is executed inside the
    // `provide` plugin helper.
    // https://nuxt.com/docs/api/configuration/nuxt-config/#plugins-1
    plugins: [
      // '~/plugins/foo.client.js', // only in client side
      '~/plugins/bar.server.js', // only in server side
      // '~/plugins/baz.js', // both client & server
      // { src: '~/plugins/client-only.js', mode: 'client' }, // only on client side
      // { src: '~/plugins/server-only.js', mode: 'server' } // only on server side
      // { src: '~/plugins/foo.js' }, // both client & server
    ]
  },

  // By default, Nuxt only scans files at the top level of `/composables/`, so
  // configure it to scan the sub-directories here.
  // https://nuxt.com/docs/guide/directory-structure/composables#how-files-are-scanned
  imports: {
    dirs: [
      // Scan top-level modules
      'composables',
      // ... or scan modules nested one level deep with a specific name and file extension
      'composables/*/index.{ts,js,mjs,mts}',
      // ... or scan all modules within given directory
      'composables/**'
    ]
  }
})
