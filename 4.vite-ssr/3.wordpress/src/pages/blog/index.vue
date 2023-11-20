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

const { data, error } = await useF3tch(`/wp-json/api/v1/page/blog`)
if (error.value) {
  createError({
    statusCode: error.value.statusCode,
    name: error.value.name,
    message: error.value.message
  })
}
if (!data.value) {
  createError({
    statusCode: 500,
    message: 'No data!'
  })
}
const post = unref(data)
title.value = post.title
contents.value = post.contents

useHead({
  title: post.meta.title,
  meta: [
    {
      name: 'description',
      content: post.meta.description
    },
    {
      property: 'og:title',
      content: post.meta.og.title
    },
    {
      property: 'og:description',
      content: post.meta.og.description
    },
    {
      property: 'og:image',
      content: post.meta.og.image
    },
  ],
})
</script>
