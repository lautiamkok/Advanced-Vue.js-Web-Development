<template>
  <p v-if="!error">
    Hello! This is a Contact page to demonstrate how to handle errors.
  </p>
  <error-handler v-else />
</template>

<script setup>
import useError from '@/composables/use-error'
const { raw, error } = useError()

// Option 1 (not recommended):
// TypeError test:
// const num = 123
// num.toUpperCase()

// Option 2 (best practice):
try {
  // RangeError test:
  const l = console.log
  const arr = [90,88]
  arr.length=90**99

  // TypeError test:
  // const num = 123
  // num.toUpperCase()
} catch (error) {
  raw.value = error
}
</script>
