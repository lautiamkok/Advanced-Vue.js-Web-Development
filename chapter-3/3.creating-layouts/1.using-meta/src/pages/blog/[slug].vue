<template>
  <h1>{{ title }}</h1>
</template>

<script setup>
import { throwError } from '@/modules/utils'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

// Create a standalone reactive title.
const title = ref(null)

// Create a dummy data of posts.
const posts = [
  {
    slug: 'post-1',
    title: 'Post 1'
  },
  {
    slug: 'post-2',
    title: 'Post 2'
  }
]

let test = /^[a-zA-Z0-9\-]*$/.test(route.params.slug)
if (test === false) {
  throwError('Invalid request', 400)
}

// Find the requested post from posts.
let found = posts.find(post => post.slug === route.params.slug)

// Throw a 404 error if the page is not found.
if (found === undefined) {
  throwError('Sorry, we cannot find the requested post.', 404)
}

// Set the `ref` internal value to the title from the result.
title.value = found.title
</script>

<route>
{
  meta: { layout: 'light' }
}
</route>
