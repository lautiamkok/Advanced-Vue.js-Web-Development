<template>
  <p>
    Hello! This is a Contact page to demonstrate how to handle errors.
  </p>
</template>

<script setup>
// ReferenceError test:
const l=console.log
const cat = "cat"
cat
dog

// TypeError test:
// const num = 123
// num.toUpperCase()
</script>
