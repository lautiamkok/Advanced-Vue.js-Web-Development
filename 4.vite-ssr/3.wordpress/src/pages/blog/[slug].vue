<template>
  <div v-if="data">
    <h2>
      {{ title }}
    </h2>
    <p>
      {{ date }}
    </p>
    <img
      :src="thumbnail.url"
      v-if="thumbnail && thumbnail.url"
    />
    <div v-html="contents" />
  </div>
</template>

<script setup>
const route = useRoute()
const title = ref(null)
const date = ref(null)
const contents = ref(null)
const thumbnail = ref(null)

const { data, error } = await useF3tch(`/wp-json/api/v1/post/${route.params.slug}`)
if (error.value) {
  throwError({
    statusCode: error.value.statusCode,
    name: error.value.name,
    message: error.value.message
  })
}
if (!data.value) {
  throwError({
    statusCode: 404,
    name: 'Post Not Found!',
    message: 'Sorry, post not found!'
  })
}
const post = unref(data)
title.value = post.title
contents.value = post.contents
date.value = post.date
thumbnail.value = post.image

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
