<template>
  <h1>{{ title }}</h1>
</template>

<script setup>
const title = 'About'
</script>

<route>
// https://github.com/hannoeru/vite-plugin-pages#sfc-custom-block-for-route-data
{
  // Pass parameters to middleware.
  // https://github.com/nuxt/nuxt.js/issues/1687#issuecomment-331870619
  meta: {
    slug: 'about'
  }
}
</route>
