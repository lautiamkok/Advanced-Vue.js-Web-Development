<template>
  <!-- <img :alt="alt" :src="getAsset(src, relativePath)" ref="root" /> -->
  <img :alt="alt" :data-src="getAsset(src, relativePath)" ref="root" />
</template>

<script setup>
// Lazy load with Lozad.
// https://apoorv.pro/lozad.js/
import lozad from 'lozad'

import { ref, onMounted } from 'vue'
import { getAsset } from '@/modules/utils'

// Define props.
const props = defineProps({
  src: String,
  alt: String,
  relativePath: String
})

// https://v3.vuejs.org/guide/composition-api-template-refs.html#template-refs
const root = ref(null)

// For Lozad only:
onMounted(() => {
  // the DOM element will be assigned to the ref after initial render
  console.log(root.value) // this is your $el

  // Target the root (the element), otherwise set class="lozad" to the element.
  const observer = lozad(root.value)
  observer.observe()
})
</script>
