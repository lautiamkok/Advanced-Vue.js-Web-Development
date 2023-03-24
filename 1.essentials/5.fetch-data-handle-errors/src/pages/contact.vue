<template>
  <div v-if="!error">
    <p>
      Hello! This is a Contact page to demonstrate how to handle errors.
    </p>
  </div>
  <error-handler 
    v-else 
  />
</template>

<script setup>
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
