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
const { data } = await useF3tch('/posts/2')
if (!data) {
  createError({
    status: 500,
    message: 'No data!'
  })
}

// Unwrap the ref data.
// https://vuejs.org/api/reactivity-utilities.html#unref
const unwrapped = unref(data)

// Populate the properties.
title.value = unwrapped.title
contents.value = unwrapped.body
</script>
