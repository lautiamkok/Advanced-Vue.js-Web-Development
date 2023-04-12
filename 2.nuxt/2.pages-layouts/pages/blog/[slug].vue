<template>
  <h2>
    {{ title }}
  </h2>
  <div v-html="contents" />
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
    contents: '<p>Contents 1</p>',
    layout: 'light'
  },
  {
    slug: 'post-2',
    title: 'Post 2',
    contents: '<p>Contents 2</p>',
    layout: 'dark'
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
  // throw createError({
  //   statusCode: 404, 
  //   statusMessage: 'Page Not Found'
  // })

  showError({ 
    statusCode: 404, 
    statusMessage: 'Page Not Found'
  })
}

// Populate the data.
title.value = found.title
contents.value = found.contents

// Change the top-level layout dynamically. Note that this option will always
// make the top-level flickers a bit when refreshing the page.
// https://nuxt.com/docs/guide/directory-structure/layouts#changing-the-layout-dynamically
// definePageMeta({
//   layout: false,
// })

if (process.client) {
  setPageLayout(found.layout)
}
</script>
