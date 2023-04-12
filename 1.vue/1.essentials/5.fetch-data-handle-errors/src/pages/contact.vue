<template>
  <p>
    Hello! This is a Contact page to demonstrate how to handle errors.
  </p>
</template>

<script setup>
// RangeError test:
const l = console.log
const arr = [90,88]
arr.length=90**99

// TypeError test:
// const num = 123
// num.toUpperCase()
</script>
