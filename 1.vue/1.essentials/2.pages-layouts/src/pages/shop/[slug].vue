<template>
  <dynamic-layout v-bind:data="post" />
</template>

<script setup>
import DynamicLayout from '@/components/dynamic-layout.vue'

const route = useRoute()
const layout = ref(null)
const title = ref(null)
const contents = ref(null)

// Create a dummy data of your shop.
const posts = [
  {
    slug: 'product-1',
    title: 'Product 1',
    contents: '<p>Contents 1</p>',
    layout: 'light'
  },
  {
    slug: 'product-2',
    title: 'Product 2',
    contents: '<p>Contents 2</p>',
    layout: 'dark'
  },
  {
    slug: 'product-3',
    title: 'Product 3',
    contents: '<p>Contents 3</p>'
  }
]

// Find the requested product from products.
const post = posts.find(post => post.slug === route.params.slug)
</script>
