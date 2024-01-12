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
// Using mixins.
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
}
</script>
