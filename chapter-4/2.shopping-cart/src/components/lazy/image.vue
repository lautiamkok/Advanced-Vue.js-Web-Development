<template>
  <img :alt="alt" :data-src="getAsset(src, relativePath)" ref="root" class="lazyload" />
</template>

<script setup>
// Lazy load with lazysizes.
// https://github.com/aFarkas/lazysizes
import 'lazysizes'

import { getAsset } from '@/modules/utils'

// Define props.
const props = defineProps({
  src: String,
  alt: String,
  relativePath: String
})
</script>
