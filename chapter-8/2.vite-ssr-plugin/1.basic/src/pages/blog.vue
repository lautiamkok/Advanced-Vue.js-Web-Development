<template>
  <div>
    <h1>{{ title }}</h1>
    <div v-html="contents"></div>
    <router-view :key="route.path"/>
  </div>
</template>

<script setup>
import useFetch from '@/composables/use-fetch'
import { throwError } from '@/modules/utils'

// Bind a key the <router-view> so that Vue won't reuse the component.
// So that the content can be updated when route has changed.
import { useRoute } from 'vue-router'
const route = useRoute()

const title = ref(null)
const contents = ref(null)

const { data } = await useFetch(`/wp-json/api/v1/page/blog`)
if (data === null) {
  throwError('Sorry, we cannot find the requested page.', 404)
}

title.value = data.title
contents.value = data.contents

useHead({
  title: data.meta.primary.title,
  meta: [
    {
      name: 'description',
      content: data.meta.primary.description
    },
    {
      property: 'og:title',
      content: data.meta.open_graph.title
    },
    {
      property: 'og:description',
      content: data.meta.open_graph.description
    },
    {
      property: 'og:image',
      content: data.meta.open_graph.image
    },
  ],
})
</script>
