<template>
  <h2>
    Log
  </h2>
</template>

<script setup>
import useError from '@/composables/use-error'
const { raw } = useError()
console.log('log: `raw` =', raw.value)
</script>
