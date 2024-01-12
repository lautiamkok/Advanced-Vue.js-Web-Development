<template>
  <h1>{{ title }}</h1>
  <div v-html="contents"></div>
  <img alt="Vue logo" src="@/assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
</template>

<script setup>
import useFetch from '@/composables/use-fetch'
import { throwError } from '@/modules/utils'

const title = ref(null)
const contents = ref(null)

const { data } = await useFetch(`/wp-json/api/v1/page/home`)
if (data === null) {
  throwError('Sorry, we cannot find the requested page.', 404)
}

title.value = data.title
contents.value = data.contents

onMounted(() => {
  console.log(`I'm mounted`)
})
</script>
