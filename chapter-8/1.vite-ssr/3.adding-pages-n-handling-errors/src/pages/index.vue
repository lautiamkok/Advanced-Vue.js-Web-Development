<template>
  <div v-if="error === false">
    <h1>{{ title }}</h1>
    <div v-html="contents"></div>
    <img alt="Vue logo" src="@/assets/logo.png" />
    <HelloWorld msg="Hello Vue 3 + Vite" />
  </div>
</template>

<script setup>
import useFetch from '@/composables/use-fetch'
import { throwError } from '@/modules/utils'

const title = ref(null)
const contents = ref(null)

const { data, error } = await useFetch(`/wp-json/api/v1/page/home`)
if (data === null) {
  throwError('Query returns no data!', 500)
} 

title.value = data.title
contents.value = data.contents

onMounted(() => {
  console.log(`I'm mounted`)
})
</script>
