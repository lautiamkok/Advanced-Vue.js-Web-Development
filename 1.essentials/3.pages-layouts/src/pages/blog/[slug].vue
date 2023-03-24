<template>
  <div>
    <h3>
      {{ title }}
    </h3>
    <div v-html="contents" />
  </div>
</template>

<script setup>
const route = useRoute()
const title = ref(null)
const contents = ref(null)

// Create a dummy data of your blog.
const posts = [
  {
    slug: 'post-1',
    title: 'Post 1',
    contents: '<p>Contents 1</p>'
  },
  {
    slug: 'post-2',
    title: 'Post 2',
    contents: '<p>Contents 2</p>'
  },
  {
    slug: 'post-3',
    title: 'Post 3',
    contents: '<p>Contents 3</p>'
  }
]

// Find the requested product from products.
let found = posts.find(post => post.slug === route.params.slug)

// Throw or show a 404 error if the post is not found.
// https://nuxt.com/docs/api/utils/create-error
// https://nuxt.com/docs/api/utils/show-error#showerror
if (found === undefined) {
  //
}

// Populate the data.
title.value = found.title
contents.value = found.contents
</script>
