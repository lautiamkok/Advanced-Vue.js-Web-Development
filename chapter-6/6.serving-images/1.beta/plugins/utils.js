'use strict'

import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      getAsset: (file, relativePath) => {
        if (!file) {
          return
        }

        // Get image from the `assets` folder.
        const images = import.meta.globEager('/assets/images/*.{jpg,png,svg}')
        const image = images[`/assets/images/${file}`]
        if (image !== undefined) {
          return image.default
        }

        console.log(`${file} doesn't exist locally!`)

        if (!relativePath) {
          return
        }

        // Access the API_BASE_URL variable from the Nuxt config file.
        const config = useRuntimeConfig()
        const apiBaseUrl = config.API_BASE_URL

        // Get the image from the remote API.
        const array = relativePath.split('/')
        array.pop()
        const path = array.join('/')
        return `${apiBaseUrl}/${path}/${file}`
      }
    }
  }
})
