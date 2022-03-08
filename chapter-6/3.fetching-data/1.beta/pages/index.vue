<template>
  <p v-if="error">An error occurred :(</p>
  <div v-else>
    <h1>{{ title }}</h1>
    <div v-html="contents"></div>
  </div>
</template>

<script setup>
// https://vuejs.org/api/composition-api-lifecycle.html#composition-api-lifecycle-hooks
import { ref, unref } from 'vue'

const title = ref(null)
const contents = ref(null)

// https://v3.nuxtjs.org/docs/usage/runtime-config#environment-variables
const config = useRuntimeConfig()

// Fetch the data using the `useFetch` method provided by Nuxt.
// https://v3.nuxtjs.org/docs/usage/data-fetching
const { data, error } = await useFetch('/pages/pages__home__index', {
  baseURL: config.BASE_URL
})

// Unwrap the ref data.
// https://v3.vuejs.org/api/refs-api.html#unref
const unwrapped = unref(data)
if (!unref(error)) {
  // Populate the properties.
  title.value = unwrapped.title
  contents.value = unwrapped.contents
}
</script>
