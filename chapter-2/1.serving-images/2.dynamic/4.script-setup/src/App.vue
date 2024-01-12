<template>
  <ul>
    <li v-for="image in images.assets">
      <img :alt="image.alt" :src="getAsset(image.src)" />
    </li>
  </ul>

  <ul>
    <li v-for="image in images.public">
      <img :alt="image.alt" :src="getStatic(image.src)" />
    </li>
  </ul>
</template>

<script setup>
// Using Composition API with SFC <script setup>.
// https://vuejs.org/api/sfc-script-setup.html
import { getAsset, getStatic } from '@/modules/utils'

const images = {
  assets: [
    {
      src: 'afternoon.jpg',
      alt: 'afternoon'
    }
  ],
  public: [
    {
      src: 'nightfall.jpg',
      alt: 'afternoon'
    }
  ]
}

// console.table(images.assets)
// console.table(images.public)
</script>
