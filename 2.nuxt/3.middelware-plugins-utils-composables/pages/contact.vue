<template>
  <p>
    Hello Contact!
  </p>
</template>

<script setup>
definePageMeta({
  middleware: ['foo', 'named-foo']
  // or middleware: 'foo'
})
</script>
