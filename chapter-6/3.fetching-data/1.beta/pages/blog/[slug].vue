<template>
  <h1>{{ data.title }}</h1>
  <div v-html="data.contents"></div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const config = useRuntimeConfig()
const { data, error } = await useFetch(`/posts/posts__${route.params.slug}__index`, {
  baseURL: config.BASE_URL
})
</script>
