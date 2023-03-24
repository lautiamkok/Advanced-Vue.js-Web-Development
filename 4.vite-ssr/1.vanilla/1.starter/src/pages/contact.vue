<template>
  <p v-if="!error">
    Hello! This is a Contact page to demonstrate how to handle errors.
  </p>
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

// Override the default head.
useHead({
  title: 'Contact Me!',
  meta: [
    {
      name: 'description',
      content: 'Contact description...'
    },
    {
      property: 'og:title',
      content: 'Contact og title...'
    },
    {
      property: 'og:description',
      content: 'Contact og description...'
    },
    {
      property: 'og:image',
      content: 'Contact og image...'
    },
  ],
})
</script>
