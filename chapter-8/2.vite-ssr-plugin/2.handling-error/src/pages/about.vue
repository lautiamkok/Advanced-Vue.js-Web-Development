<template>
  <h1>{{ title }}</h1>
  <div v-html="contents"></div>
  <comment v-if="error === false">
    <p>I am a slot content</p>
  </comment>
  <button @click="count++">{{ count }}</button>
</template>

<script setup>
import useFetch from '@/composables/use-fetch'
import { throwError } from '@/modules/utils'

const title = ref(null)
const contents = ref(null)
const count = ref(1)

const { data, error, message, status } = await useFetch(`/wp-json/api/v1/page/about`)
if (error) {
  throwError(JSON.stringify(message), status)
}

title.value = data.title
contents.value = data.contents
</script>
