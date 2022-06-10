<template>
  <h1>{{ title }}</h1>
</template>

<script setup>
const title = 'Home'

onMounted(() => {
  console.log(`I'm mounted`)
})
</script>
