<template>
  <h1 class="text-red">{{ title }}</h1>
  <p class="text-blue">Hello World!</p>

  <div class="container mx-auto text-center space-y-3 space-between-link">
    <p>I am a paragraph with a <a href="#">link</a>.</p>
    <p>I am another paragraph with a <a href="#">link</a>.</p>
    <p>I am another paragraph with a <a href="#">link</a>.</p>
  </div>

  <div class="text-center p-3">
    <button
      class="bg-gray-900
      hover:bg-violet-600
      text-white
      font-bold
      py-2
      px-4
      rounded
      focus:outline-none
      focus:shadow-outline"
    >I am a button</button>
  </div>

  <button class="button">I am a button</button>
  
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
