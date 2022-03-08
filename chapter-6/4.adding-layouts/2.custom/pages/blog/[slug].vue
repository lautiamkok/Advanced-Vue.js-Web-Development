<template>
  <h1>{{ title }}</h1>
  <div v-html="contents"></div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import emitter from '@/modules/emitter'
import useFetch from '@/composables/use-fetch'

const route = useRoute()
const title = ref(null)
const contents = ref(null)
const { data } = await useFetch(`/posts/posts__${route.params.slug}__index`)

// Emit a `set-layout` event.
emitter.emit('set-layout', data.layout)

// Set the `ref` internal value to the title and contents from the result.
title.value = data.title
contents.value = data.contents

// same as beforeRouteUpdate option with no access to `this`
onBeforeRouteUpdate((to, from) => {
  to.meta.layout = true
})
</script>
