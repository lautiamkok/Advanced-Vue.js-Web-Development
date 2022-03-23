<template>
  <!-- ES6 destructuring -->
  <h1>{{ title }}</h1>

  <!-- non-ES6 destructuring -->
  <!-- <h1>{{ product.title }}</h1> -->
</template>

<script setup>
import { throwError } from '@/modules/utils'
import { reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

// Declare a reactive state.
const product = reactive({
  title: ''
})

// Destructure (ES6 destructuring) and make the property reactive again.
let { title } = toRefs(product)

// Create a dummy data of products.
const products = [
  {
    slug: 'product-1',
    title: 'Product 1'
  },
  {
    slug: 'product-2',
    title: 'Product 2'
  }
]

// Throw a 400 error if the param is invalid.
let test = /^[a-zA-Z0-9\-]*$/.test(route.params.slug)
if (test === false) {
  throwError('Invalid request', 400)
}

// Find the requested product from products.
let found = products.find(product => product.slug === route.params.slug)

// Throw a 404 error if the page is not found.
if (found === undefined) {
  throwError('Sorry, we cannot find the requested product.', 404)
}

// For ES6 destructuring.
title = found.title
</script>
