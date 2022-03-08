<template>
  <h1>{{ data.title }}</h1>
  <div v-html="data.contents"></div>
</template>

<script setup>
const config = useRuntimeConfig()
const { data, error } = await useFetch('/pages/pages__about__index', {
  baseURL: config.BASE_URL
})
</script>
