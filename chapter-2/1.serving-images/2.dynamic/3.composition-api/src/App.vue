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

<script>
// Using Composition API.
// https://vuejs.org/guide/extras/composition-api-faq.html
import { getAsset, getStatic } from '@/modules/utils'
export default {
  setup() {
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
    return {
      images,
      getAsset,
      getStatic
    }
  }
}
</script>
