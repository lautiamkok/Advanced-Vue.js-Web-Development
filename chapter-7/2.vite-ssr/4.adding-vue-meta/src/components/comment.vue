<template>
  <p>{{ message }}</p>
  <slot/>
</template>

<script setup>
const message = 'Awesome idea!'
</script>
