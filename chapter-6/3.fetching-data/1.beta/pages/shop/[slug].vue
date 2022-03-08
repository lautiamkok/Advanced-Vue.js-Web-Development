<template>
  <h1>{{ data.title }}</h1>
  <div v-html="data.contents"></div>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute, onBeforeRouteLeave } from 'vue-router'

const route = useRoute()
const config = useRuntimeConfig()
const { data, error } = await useFetch(`/products/products__${route.params.slug}__index`, {
  baseURL: config.BASE_URL
})
</script>
