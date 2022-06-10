<template>
  <NuxtLayout :name="layout">
    <h1>{{ title }}</h1>
    <div v-html="contents"></div>
  </NuxtLayout>
</template>

<script setup>
const route = useRoute()
const layout = ref(null)
const title = ref(null)
const contents = ref(null)

const config = useRuntimeConfig()
const { data } = await useFetch(`/posts/posts__${route.params.slug}__index`, {
  baseURL: config.BASE_URL
})

title.value = data.value.title
contents.value = data.value.contents

// Change the layout locally.
layout.value = data.value.layout
</script>
