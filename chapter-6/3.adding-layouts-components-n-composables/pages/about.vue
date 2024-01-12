<template>
  <div>
    <h1>{{ title }}</h1>
    <div v-html="contents"></div>
  </div>
</template>

<script setup>
const title = ref(null)
const contents = ref(null)

const config = useRuntimeConfig()
const { data } = await useFetch('/pages/pages__about__index', {
  baseURL: config.BASE_URL
})

// Add layout manually to change the top-level layout.
definePageMeta({
  layout: 'light',
})

// Populate the properties.
title.value = data.value.title
contents.value = data.value.contents
</script>
