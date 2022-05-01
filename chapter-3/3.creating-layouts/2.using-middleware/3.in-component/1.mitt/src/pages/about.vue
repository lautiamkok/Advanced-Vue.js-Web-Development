<template>
  <h1>{{ title }}</h1>
  <div v-html="contents"></div>
</template>

<script setup>
import { ref } from 'vue'
import { throwError, isEmpty } from '@/modules/utils'
import emitter from '@/modules/emitter'

const title = ref(null)
const contents = ref(null)

const response = await fetch('http://localhost:3001/pages/pages__about__index')
const data = await response.json()
if (isEmpty(data)) {
  throwError('Sorry, we cannot find the requested page.', 404)
}

// Emit a `set-layout` event.
emitter.emit('set-layout', data.layout)

title.value = data.title
contents.value = data.contents
</script>
