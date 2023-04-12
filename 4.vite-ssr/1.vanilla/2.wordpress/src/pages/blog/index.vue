<template>
  <div v-if="data">
    <h2>
      {{ title }}
    </h2>
    <div v-html="contents" />
  </div>
</template>

<script setup>
const title = ref(null)
const contents = ref(null)

const { data } = await useF3tch(`/wp-json/api/v1/page/blog`)
if (!data) {
  createError({
    status: 500,
    message: 'No data!'
  })
}
title.value = data.title
contents.value = data.contents

useHead({
  title: data.meta.title,
  meta: [
    {
      name: 'description',
      content: data.meta.description
    },
    {
      property: 'og:title',
      content: data.meta.og.title
    },
    {
      property: 'og:description',
      content: data.meta.og.description
    },
    {
      property: 'og:image',
      content: data.meta.og.image
    },
  ],
})
</script>
