<template>
  <h1 class="red">{{ title }}</h1>
  <img alt="afternoon" src="@/assets/images/afternoon.jpg" />
  <img alt="nightfall" src="/static/nightfall.jpg" />

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

  <ul>
    <li v-for="image in images.assets">
      <img :alt="image.alt" :src="$getAsset(image.src)" />
    </li>
  </ul>
</template>

<script setup>
import { getAsset, getStatic } from '@/modules/utils'

const { $getAsset } = useNuxtApp()
const title = 'Home'
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
</script>
