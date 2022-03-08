<template>
  <h1>{{ title }}</h1>
  <div v-html="contents"></div>
</template>

<script setup>
import { ref } from 'vue'
import { throwError, isEmpty } from '@/modules/utils'

const title = ref(null)
const contents = ref(null)

const response = await fetch('http://localhost:3001/pages/pages__about__index')
const data = await response.json()
if (isEmpty(data)) {
  throwError('Sorry, we cannot find the requested page.', 404)
}

title.value = data.title
contents.value = data.contents
</script>
