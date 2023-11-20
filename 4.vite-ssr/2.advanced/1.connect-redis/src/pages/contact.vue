<template>
  <p v-if="!error">
    Hello! This is a Contact page to demonstrate how to handle errors.
  </p>
  <error-handler 
    v-else 
    v-bind:error="error" 
  />
</template>

<script setup>
const error = ref(false)
try {
  // ReferenceError test:
  const l=console.log
  const cat = "cat"
  cat
  dog

  // TypeError test:
  // const num = 123
  // num.toUpperCase()
} catch (e) {
  error.value = e
}
</script>
