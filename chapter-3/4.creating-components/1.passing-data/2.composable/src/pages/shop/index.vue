<template>
  <h1>{{ title }}</h1>
  <div v-html="contents"></div>
  {{ items }}
  <nav v-if="menu">
    <ul>
      <li v-for="(item, index) in menu">
        <router-link :to="item.path">{{ item.title }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import useFetch from '@/composables/use-fetch'
import useMany from '@/composables/use-many'
import { throwError } from '@/modules/utils'

const title = ref(null)
const contents = ref(null)

// Fetch data.
const { data } = await useFetch('/pages/pages__shop__index')
if (data === null) {
  throwError('Sorry, we cannot find the requested page.', 404)
}

// Populate the properties.
title.value = data.title
contents.value = data.contents

const { items } = useMany()

const menu = [
  {
    title: 'Product 1',
    path: '/shop/product-1'
  },
  {
    title: 'Product 2',
    path: '/shop/product-2'
  },
]
</script>
