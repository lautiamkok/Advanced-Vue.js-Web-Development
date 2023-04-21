<template>
  <div v-if="!error">
    <h2>
      {{ title }}
    </h2>
    <div v-html="contents" />
  </div>
  <error-handler 
    v-else 
    v-bind:error="error" 
  />
</template>

<script setup>
const title = ref(null)
const contents = ref(null)

// https://nuxt.com/docs/getting-started/configuration
const runtimeConfig = useRuntimeConfig()

// Fetch the data using the `useFetch` method provided by Nuxt.
// https://nuxt.com/docs/api/composables/use-fetch
const { data, error } = await useFetch('/posts/1000000', {
  baseURL: runtimeConfig.public['apiBaseUrl']
})
const failure = unref(error)
if (failure === null) {
  const post = unref(data)

  // Populate the properties.
  title.value = post.title
  contents.value = post.body
}
</script>
