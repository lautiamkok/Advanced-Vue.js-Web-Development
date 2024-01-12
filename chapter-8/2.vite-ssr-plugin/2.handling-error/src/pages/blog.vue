<template>
  <div>
    <div v-if="!route.params.slug">
      <h1>{{ title }}</h1>
      <div v-html="contents"></div>
    </div>
    <router-view :key="route.path"/>
  </div>
</template>

<script setup>
import useFetch from '@/composables/use-fetch'
import { throwError } from '@/modules/utils'

const route = useRoute()
const title = ref(null)
const contents = ref(null)

const { data } = await useFetch(`/wp-json/api/v1/page/blog`)
if (data === null) {
  throwError('Sorry, we cannot find the requested page.', 404)
}

title.value = data.title
contents.value = data.contents
</script>
