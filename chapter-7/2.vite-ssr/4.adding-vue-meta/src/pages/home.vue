<template>
  <h1>{{ title }}</h1>
  <div v-html="contents"></div>
  <img alt="Vue logo" src="@/assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
</template>

<script setup>
// https://vuejs.org/api/composition-api-lifecycle.html#composition-api-lifecycle-hooks
import { ref, onMounted } from 'vue'
import { useMeta } from 'vue-meta'

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

// https://github.com/nuxt/vue-meta/tree/next#quick-usage
useMeta({
  title: data.meta.primary.title,
  description: data.meta.primary.description,
  og: {
    title: data.meta.open_graph.title,
    description: data.meta.open_graph.description,
    image: [
      data.meta.open_graph.image
    ]
  },
  htmlAttrs: {
    lang: 'en',
    amp: true
  }
})

onMounted(() => {
  console.log(`I'm mounted`)
})
</script>
