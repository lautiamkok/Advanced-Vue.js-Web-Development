<template>
  <p class="text-blue">
    Hello World!
  </p>

  <div class="container mx-auto space-y-3 has-links border-1">
    <p>I am a paragraph with a <a href="#">link</a>.</p>
    <p>I am another paragraph with a <a href="#">link</a>.</p>
    <p>I am another paragraph with a <a href="#">link</a>.</p>
  </div>

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

  <button class="button">
    I am a button
  </button>

  <div class="py-10">
    <p>
      Requiring images manually:
    </p>
    <img alt="R0003515" src="@/assets/images/R0003515.jpg" />
    <img alt="R0001844" src="/static/R0001844.jpg" />
  </div>

  <div class="py-10">
    <p>
      Requiring images dynamically (using Composition API):
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

  <current-breakpoint/>
</template>

<script setup>
import CurrentBreakpoint from '@/components/current-breakpoint.vue'

// Using Composition API.
// https://vuejs.org/guide/extras/composition-api-faq.html
import useAsset from '@/composables/use-asset'
import useStatic from '@/composables/use-static'

const images = {
  assets: [
    {
      src: 'R0003515.jpg',
      alt: 'R0003515'
    }
  ],
  public: [
    {
      src: 'R0001844.jpg',
      alt: 'R0001844'
    }
  ]
}
</script>
