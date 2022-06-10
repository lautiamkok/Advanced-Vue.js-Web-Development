<template>
  <h1>{{ title }}</h1>
</template>

<script setup>
const title = 'Contact'

// TypeError test:
const num = 123
num.toUpperCase()
</script>
