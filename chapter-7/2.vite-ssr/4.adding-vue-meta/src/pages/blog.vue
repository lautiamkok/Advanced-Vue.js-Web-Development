<template>
  <h1>{{ title }}</h1>
  <div v-html="contents"></div>
  <router-view :key="route.path"/>
</template>

<script setup>
import { ref } from 'vue'
import { useMeta } from 'vue-meta'

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

useMeta({
  title: data.meta.primary.title,
  htmlAttrs: {
    lang: 'en',
    amp: true
  }
})
</script>
