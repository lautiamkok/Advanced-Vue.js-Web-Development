<template>
  <div v-if="data">
    <h1>{{ data.title }}</h1>
    <div v-html="data.contents"></div>
  </div>
</template>

<script setup>
import { throwError } from '@/modules/utils'

const config = useRuntimeConfig()
const { data, error } = await useFetch('/pages/pages__about__index', {
  baseURL: config.BASE_URL
})
if (error.value) {
  throwError('Query returns no data!', 500)
}
</script>
