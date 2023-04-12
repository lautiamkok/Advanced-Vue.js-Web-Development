<template>
  <p>
    Hello About!
  </p>
</template>

<script setup>
// Add layout manually to change the top-level layout.
definePageMeta({
  layout: 'light',
})
if (process.client) {
  setPageLayout('light')
}
</script>
