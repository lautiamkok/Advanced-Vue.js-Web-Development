<template>
  <p>
    Hello! You are seeing the About page.
  </p>
</template>

<script setup>
// Override the default head.
useHead({
  title: 'About Me!',
  meta: [
    {
      name: 'description',
      content: 'About description...'
    },
    {
      property: 'og:title',
      content: 'About og title...'
    },
    {
      property: 'og:description',
      content: 'About og description...'
    },
    {
      property: 'og:image',
      content: 'About og image...'
    },
  ],
})
</script>
