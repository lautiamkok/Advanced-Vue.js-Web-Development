<template>
  <h1>{{ title }}</h1>
  <div v-html="contents"></div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import useFetch from '@/composables/use-fetch'
import { throwError } from '@/modules/utils'

const route = useRoute()
const title = ref(null)
const contents = ref(null)

let test = /^[a-zA-Z0-9\-]*$/.test(route.params.slug)
if (test === false) {
  throwError('Invalid request', 400)
}

const { data } = await useFetch(`/posts/posts__${route.params.slug}__index`)
if (data === null) {
  throwError('Sorry, we cannot find the requested page.', 404)
}

// Set the `ref` internal value to the title and contents from the result.
title.value = data.title
contents.value = data.contents
</script>
