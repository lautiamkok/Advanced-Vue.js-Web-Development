<template>
  <p>
    Hello World!
  </p>
</template>

<script setup>
// Set the layout to override the layout from the blog posts. The layout set in
// the blog posts will override the top-level layout permanent when refreshing
// the blog post.
if (process.client) {
  setPageLayout('default')
}
</script>

