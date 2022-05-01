<template>
  <h1>{{ title }}</h1>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

import useFetch from '@/composables/use-fetch'
import { throwError } from '@/modules/utils'
import emitter from '@/modules/emitter'

const route = useRoute()
const title = ref(null)
const contents = ref(null)

let test = /^[a-zA-Z0-9\-]*$/.test(route.params.slug)
if (test === false) {
  throwError('Invalid request', 400)
}

const { data } = await useFetch(`/posts/posts__${route.params.slug}__index`)
if (data === null) {
  throwError('Sorry, we cannot find the requested page.', 404)
}

// Emit a `set-layout` event.
emitter.emit('set-layout', data.layout)

// Populate the properties.
title.value = data.title
contents.value = data.contents

// same as beforeRouteUpdate option with no access to `this`
onBeforeRouteUpdate((to, from) => {
  to.meta.layout = true
})
</script>
