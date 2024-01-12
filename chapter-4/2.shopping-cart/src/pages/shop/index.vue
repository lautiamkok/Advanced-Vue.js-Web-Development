<template>
  <h1>{{ title }}</h1>
  <div v-html="contents"></div>
  <li
    v-for="item in products"
    v-bind:key="item.id"
    v-if="products !== null"
  >
    <product-item
      v-bind:product=item
    />
  </li>
</template>

<script setup>
import useFetch from '@/composables/use-fetch'
import { throwError } from '@/modules/utils'

const store = useStore()
const title = ref(null)
const contents = ref(null)
const products = ref({})

// Fetch data.
const { data:shop } = await useFetch('/pages/pages__shop__index')
if (shop === null) {
  throwError('Sorry, we cannot find the requested page.', 404)
}

// Populate the properties.
title.value = shop.title
contents.value = shop.contents

// Fetch the data and populate.
const { data:items } = await useFetch('/products')
products.value = items
</script>
