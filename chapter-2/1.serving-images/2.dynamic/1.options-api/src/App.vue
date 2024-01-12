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
// Using explicit import with options API
import { getAsset, getStatic } from '@/modules/utils'

export default {
  data () {
    return {
      images: {
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
    }
  },
  methods: {
    getAsset,
    getStatic
  }
}
</script>
