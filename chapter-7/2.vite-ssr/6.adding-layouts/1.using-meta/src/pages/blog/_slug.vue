<template>
  <h1>{{ title }}</h1>
  <p>{{ date }}</p>
  <img
    :src="thumbnail.url"
    v-if="thumbnail && thumbnail.url"
  />
  <div v-html="contents"></div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import useFetch from '@/composables/use-fetch'
import useDate from '@/composables/use-date'
import { throwError } from '@/modules/utils'

const route = useRoute()
const title = ref(null)
const date = ref(null)
const contents = ref(null)
const thumbnail = ref(null)

const { data } = await useFetch(`/wp-json/api/v1/post/${route.params.slug}`)
if (data === null) {
  throwError('Sorry, we cannot find the requested page.', 404)
}

title.value = data.title
contents.value = data.contents
date.value = useDate(data.date)
thumbnail.value = data.image
</script>
