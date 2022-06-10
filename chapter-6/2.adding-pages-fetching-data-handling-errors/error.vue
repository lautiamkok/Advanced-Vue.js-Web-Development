<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ error }}</p>
  </div>
</template>

<script setup>
// https://v3.nuxtjs.org/api/composables/use-error
const error = useError()
const title = 'Error'
</script>
