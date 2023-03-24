// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // The private keys which are only available server-side
    stream: process.env.STREAM || 'false',

    // Keys within public are also exposed client-side
    public: {
      apiBaseUrl: process.env.API_BASE_URL
    }
  },
  // https://nuxt.com/docs/migration/configuration#modules
  modules: [
    'nuxt-windicss'
  ],
  // https://nuxt.com/docs/api/configuration/nuxt-config/#css
  css: [
    '@/assets/styles/css/main.css',
    '@/assets/styles/less/main.less'
  ]
})
