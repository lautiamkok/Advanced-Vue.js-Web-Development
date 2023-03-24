<template>
  <div v-if="!error">
    <h1>{{ post.title }}</h1>
    <div v-html="post.body"></div>
  </div>
  <error-handler 
    v-bind:error="error" 
    v-else 
  />
</template>

<script setup>
const route = useRoute()
const runtimeConfig = useRuntimeConfig()

const { data: post, error } = await useFetch(`/posts/${route.params.id}`, {
  baseURL: runtimeConfig.apiBaseUrl
})
</script>
