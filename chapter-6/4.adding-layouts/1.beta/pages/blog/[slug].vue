<template>
  <NuxtLayout :name="layout">
    <h1>{{ title }}</h1>
    <div v-html="contents"></div>
  </NuxtLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import useFetch from '@/composables/use-fetch'

const route = useRoute()
const layout = ref(null)
const title = ref(null)
const contents = ref(null)
const { data } = await useFetch(`/posts/posts__${route.params.slug}__index`)

// Set the `ref` internal value to the title and contents from the result.
layout.value = data.layout
title.value = data.title
contents.value = data.contents
</script>
