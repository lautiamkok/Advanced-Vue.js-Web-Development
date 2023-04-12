<template>
  <div v-if="!error">
    <h2>
      {{ title }}
    </h2>
    <div v-html="contents" />
  </div>
</template>

<script setup>
const title = ref(null)
const contents = ref(null)

// https://nuxt.com/docs/getting-started/configuration
const runtimeConfig = useRuntimeConfig()

// Fetch the data using the `useFetch` method provided by Nuxt.
// https://nuxt.com/docs/api/composables/use-fetch
const { data, error } = await useFetch('/posts/100', {
  baseURL: runtimeConfig.public['apiBaseUrl']
})
const failure = unref(error)
if (failure !== null) {
  // Show a full screen error page on the `error.vue` page.
  // https://nuxt.com/docs/api/utils/show-error
  showError({ 
    statusCode: failure.statusCode || 500, 
    statusMessage: failure.message
  })
}

// Unwrap the ref data.
// https://vuejs.org/api/reactivity-utilities.html#unref
const post = unref(data)

// Populate the properties.
title.value = post.title
contents.value = post.body
</script>
