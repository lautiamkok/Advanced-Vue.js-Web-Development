<template>
  <div>
    <div v-if="!data">
      <not-found/>
    </div>
    <div v-else>
      <h1>{{ title }}</h1>
      <p>{{ date }}</p>
      <img
        :src="thumbnail.url"
        v-if="thumbnail && thumbnail.url"
      />
      <div v-html="contents"></div>
    </div>
  </div>
</template>

<script setup>
// https://github.com/frandiox/vite-ssr#editing-response-and-redirects
import { useContext } from 'vite-ssr'

import useFetch from '@/composables/use-fetch'
import useDate from '@/composables/use-date'
import { throwError } from '@/modules/utils'

const { writeResponse } = useContext()
const route = useRoute()
const title = ref(null)
const date = ref(null)
const contents = ref(null)
const thumbnail = ref(null)

const { data } = await useFetch(`/wp-json/api/v1/post/${route.params.slug}`)
if (data === null && import.meta.env.SSR) {
  writeResponse({
    status: 404
  })
} 
if (data) {
  title.value = data.title
  contents.value = data.contents
  date.value = useDate(data.date)
  thumbnail.value = data.image
}
</script>
