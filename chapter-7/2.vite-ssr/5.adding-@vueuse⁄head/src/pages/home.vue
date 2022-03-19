<template>
  <h1>{{ title }}</h1>
  <div v-html="contents"></div>
  <img alt="Vue logo" src="@/assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
</template>

<script setup>
// https://vuejs.org/api/composition-api-lifecycle.html#composition-api-lifecycle-hooks
import { ref, onMounted } from 'vue'
import { useHead } from '@vueuse/head'

import useFetch from '@/composables/use-fetch'
import { throwError } from '@/modules/utils'
import HelloWorld from '@/components/HelloWorld.vue'

const title = ref(null)
const contents = ref(null)

const { data } = await useFetch(`/wp-json/api/v1/page/home`)
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

onMounted(() => {
  console.log(`I'm mounted`)
})
</script>
