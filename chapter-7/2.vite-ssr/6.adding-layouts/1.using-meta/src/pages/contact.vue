<template>
  <h1>{{ title }}</h1>
  <div v-html="contents"></div>
</template>

<script setup>
import { ref } from 'vue'

import useFetch from '@/composables/use-fetch'
import { throwError } from '@/modules/utils'

const title = ref(null)
const contents = ref(null)
const { data } = await useFetch(`/wp-json/api/v1/page/contact`)
if (data === null) {
  throwError('Sorry, we cannot find the requested page.', 404)
}

title.value = data.title
contents.value = data.contents
</script>

