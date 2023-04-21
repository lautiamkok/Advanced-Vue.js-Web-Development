<template>
  <site-header />
  <nav-main />
  <NuxtPage />
</template>

<script setup>
// Handle errors that come from anywhere in the app, such as the error occurs in
// `pages`, `components`, and `composables` directories, etc, that are not
// caught in the `try-catch` block.
onErrorCaptured(err => {
  // Catch the error and send it to the `error.vue` page.
  // https://nuxt.com/docs/api/utils/show-error#showerror
  showError({ 
    statusCode: err.statusCode || 500, 
    statusMessage: `${err.name} - ${err.message}`,
    stack: err.stack
  })

  // Return false to prevent the error from propagating further.
  return false
})
</script>
