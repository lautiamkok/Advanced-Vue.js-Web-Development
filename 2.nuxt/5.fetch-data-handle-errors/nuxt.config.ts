// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // The private keys which are only available server-side
    // apiSecret: '123',
    // Keys within public are also exposed client-side
    public: {
      apiBaseUrl: process.env.API_BASE_URL
    }
  },
  // https://nuxt.com/docs/api/configuration/nuxt-config/#css
  css: [
    '@/assets/styles/css/main.css',
  ]
})
