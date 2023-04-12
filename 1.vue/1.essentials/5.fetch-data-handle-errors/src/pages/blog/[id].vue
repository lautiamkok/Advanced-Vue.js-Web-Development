<template>
  <div v-if="post">
    <h1>
      {{ post.title }}
    </h1>
    <div v-html="post.body" />
  </div>
</template>

<script setup>
const route = useRoute()
const { data: post } = await useF3tch(`/posts/${route.params.id}`)
if (!post) {
  createError({
    status: 404,
    name: 'Post Not Found!',
    message: 'Post not found!'
  })
}
</script>
