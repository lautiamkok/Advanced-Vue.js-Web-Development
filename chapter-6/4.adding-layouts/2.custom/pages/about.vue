<template>
  <h1>{{ title }}</h1>
  <div v-html="contents"></div>
</template>

<script setup>
// https://vuejs.org/api/composition-api-lifecycle.html#composition-api-lifecycle-hooks
import { ref } from 'vue'
import useFetch from '@/composables/use-fetch'
import emitter from '@/modules/emitter'

const title = ref(null)
const contents = ref(null)
const { data } = await useFetch('/pages/pages__about__index')

// Emit a `set-layout` event.
emitter.emit('set-layout', data.layout)

// Populate the properties.
title.value = data.title
contents.value = data.contents
</script>
