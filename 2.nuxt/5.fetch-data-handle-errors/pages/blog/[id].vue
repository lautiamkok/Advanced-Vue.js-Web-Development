<template>
  <div v-if="!error">
    <h2>
      {{ post.title }}
    </h2>
    <div v-html="post.body" />
  </div>
</template>

<script setup>
const route = useRoute()
const runtimeConfig = useRuntimeConfig()

const { data: post, error } = await useFetch(`/posts/${route.params.id}`, {
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
</script>
