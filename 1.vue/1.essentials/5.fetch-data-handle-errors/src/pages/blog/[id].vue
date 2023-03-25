<template>
  <div v-if="!error">
    <h1>
      {{ post.title }}
    </h1>
    <div v-html="post.body" />
  </div>
</template>

<script setup>
const route = useRoute()
const { raw } = useError()
const { data: post, error } = await useF3tch(`/posts/${route.params.id}`)
raw.value = error
</script>
