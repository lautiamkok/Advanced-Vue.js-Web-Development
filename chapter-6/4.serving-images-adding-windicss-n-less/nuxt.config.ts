import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL,
    API_BASE_URL: process.env.API_BASE_URL
  },
  buildModules: [
    'nuxt-windicss'
  ],
  css: [
    // '~/assets/styles/css/main.css',
    '~/assets/styles/less/main.less'
  ]
})
