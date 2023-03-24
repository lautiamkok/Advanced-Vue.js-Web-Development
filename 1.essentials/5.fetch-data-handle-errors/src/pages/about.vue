<template>
  <div v-if="!error">
    <h2>
      {{ title }}
    </h2>
    <div v-html="contents" />
  </div>
</template>

<script setup>
const title = ref(null)
const contents = ref(null)

const { raw } = useError()
const { data, error } = await useF3tch('/posts/2')

// Unwrap the ref data.
// https://vuejs.org/api/reactivity-utilities.html#unref
const unwrapped = unref(data)
if (!unref(error)) {
  // Populate the properties.
  title.value = unwrapped.title
  contents.value = unwrapped.body
}
raw.value = error
</script>
