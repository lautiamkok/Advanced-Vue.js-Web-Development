<template>
  <h1>{{ title }}</h1>
</template>

<script setup>
// https://vuejs.org/api/composition-api-lifecycle.html#composition-api-lifecycle-hooks
import { onMounted } from 'vue'

const title = 'Home'

onMounted(() => {
  console.log(`I'm mounted`)
})
</script>
