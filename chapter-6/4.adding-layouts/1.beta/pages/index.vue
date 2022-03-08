<template>
  <div>
    <h1>{{ title }}</h1>
    <div v-html="contents"></div>
  </div>
</template>

<script setup>
// https://vuejs.org/api/composition-api-lifecycle.html#composition-api-lifecycle-hooks
import { ref } from 'vue'
import useFetch from '@/composables/use-fetch'

const title = ref(null)
const contents = ref(null)
const { data } = await useFetch('/pages/pages__home__index')

// Populate the properties.
title.value = data.title
contents.value = data.contents
</script>

