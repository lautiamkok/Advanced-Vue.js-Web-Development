<template>
  <div>
    <h1>{{ data.title }}</h1>
    <div v-html="data.contents"></div>
  </div>
</template>

<script setup>
const route = useRoute()
const config = useRuntimeConfig()
const { data, error } = await useFetch(`/posts/posts__${route.params.slug}__index`, {
  baseURL: config.BASE_URL
})
if (error.value) {
  throwError('Sorry, we cannot find the page you are looking for.', 404)
}
</script>
