<template>
  <h1>{{ title }}</h1>
  <div v-html="contents"></div>
</template>

<script setup>
import useFetch from '@/composables/use-fetch'
import { throwError } from '@/modules/utils'

const title = ref(null)
const contents = ref(null)

// TypeError test:
const num = 123
num.toUpperCase()

const { data } = await useFetch(`/wp-json/api/v1/page/contact`)
if (data === null) {
  throwError('Query returns no data!', 500)
}

title.value = data.title
contents.value = data.contents
</script>

