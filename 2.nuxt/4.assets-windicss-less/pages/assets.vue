<template>
  <div class="py-10">
    <p>
      Requiring images manually:
    </p>
    <img alt="R0003515" src="~/assets/images/R0003515.jpg" />
    <img alt="R0001844" src="/static/R0001844.jpg" />
  </div>

  <div class="py-10">
    <p>
      Requiring images dynamically:
    </p>
    <ul>
      <li v-for="image in images.assets">
        <img 
          :alt="image.alt" 
          :src="useAsset(image.src)" 
        />
      </li>
    </ul>
    <ul>
      <li v-for="image in images.public">
        <img 
          :alt="image.alt" 
          :src="useStatic(image.src)" 
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
const images = {
  // https://nuxt.com/docs/getting-started/assets#assets-directory
  assets: [
    {
      src: 'R0003515.jpg',
      alt: 'R0003515'
    }
  ],
  // https://nuxt.com/docs/getting-started/assets#public-directory
  public: [
    {
      src: 'R0001844.jpg',
      alt: 'R0001844'
    }
  ]
}
</script>
