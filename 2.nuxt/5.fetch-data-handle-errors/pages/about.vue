<template>
  <!-- Option 1: -->
  <!-- Use `showError` on the `error-boundary` page -->
  <error-boundary v-bind:error="error">
    <div v-if="!error">
      <h2>{{ title }}</h2>
      <div v-html="contents"></div>
    </div>
  </error-boundary>

  <!-- Option 2: -->
  <!-- Use `showError` on the `error-handler` page -->
  <!-- <div v-if="!error">
    <h2>{{ title }}</h2>
    <div v-html="contents"></div>
  </div>
  <error-handler 
    v-bind:error="error" 
    v-else 
  /> -->

  <!-- Option 3: -->
  <!-- Use `showError` on this page -->
  <!-- <div v-if="!error">
    <h2>{{ title }}</h2>
    <div v-html="contents"></div>
  </div> -->
</template>

<script setup>
const title = ref(null)
const contents = ref(null)

// https://nuxt.com/docs/getting-started/configuration
const runtimeConfig = useRuntimeConfig()

// Fetch the data using the `useFetch` method provided by Nuxt.
// https://nuxt.com/docs/api/composables/use-fetch
const { data, error } = await useFetch('/posts/100', {
  baseURL: runtimeConfig.apiBaseUrl
})

// Use with the option 3:
// if (unref(error) !== null) {
//   // Show a full screen error page on the `error.vue` page.
//   // https://nuxt.com/docs/api/utils/show-error
//   showError({ 
//     statusCode: error.value.status || 500, 
//     statusMessage: error.value.message
//   })
// }

// Unwrap the ref data.
// https://vuejs.org/api/reactivity-utilities.html#unref
const unwrapped = unref(data)
if (!unref(error)) {
  // Populate the properties.
  title.value = unwrapped.title
  contents.value = unwrapped.body
}
</script>
