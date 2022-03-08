<template>
  <div
    class="
      hidden
      fixed
      top-0
      bottom-0
      left-0
      right-0
      bg-gray-50
      z-1
    "
    :class="{ '!block': modal == true }"
  >
    <!-- swiper -->

    <!--
    <swiper :navigation="true" class="gallery">
      <swiper-slide
        v-for="item in gallery"
        v-bind:key="item.id"
        v-if="gallery !== null && gallery !== undefined"
      >
        <img
          :alt="item.alt"
          :src="getAsset(
            item.src,
            relativePath
          )"
        />
      </swiper-slide>
    </swiper>
    -->

    <div class="
      swiper
      gallery
      h-full
      w-full
    ">
      <div class="
        swiper-wrapper
        h-full
      ">
        <div
          class="
            swiper-slide
            flex-center-xy
            h-full
          "
          v-for="item in gallery"
          v-bind:key="item.id"
          v-if="gallery !== null && gallery !== undefined"
        >
          <img
            class="
              max-h-full
              object-contain
            "
            :alt="item.alt"
            :src="getAsset(
              item.src,
              relativePath
            )"
          />
        </div>
      </div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
    <!-- swiper -->

    <!-- nav -->
    <nav class="
      absolute
      right-0
      top-0
      z-2
    ">
      <a
        href="#"
        class="
          text-3xl
          p-3
          block
          hover:text-gray-500
        "
        v-on:click.prevent="hideModal"
      >
        X
      </a>
    </nav>
    <!-- nav -->

  </div>
</template>

<script setup>
// Find out more about this example from the demo page at:
// https://swiperjs.com/demos#navigation

// // For using Swiper Vue.js components:
// // Import Swiper Vue.js components
// import { Swiper, SwiperSlide } from 'swiper/vue'

// // Import Swiper styles
// import 'swiper/css'

// import "swiper/css/navigation"

// // import Swiper core and required modules
// import SwiperCore, {
//   Navigation
// } from 'swiper'

// Import Swiper bundle with all modules installed
import Swiper from 'swiper/bundle'

// Import styles bundle
import 'swiper/css/bundle'

import { onMounted } from 'vue'
import { getAsset } from '@/modules/utils'

// Delay the code to show the loader.
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
await timeout(3000)

// Define props.
const props = defineProps({
  gallery: Object,
  relativePath: String,
  modal: Boolean
})

// Define emit events.
const emit = defineEmits(['hide-modal'])

// Emit the event.
function hideModal () {
  emit('hide-modal')
}

onMounted(() => {
  var swiper = new Swiper('.gallery', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })
})
</script>
