<template>
  <div :data-bg="getAsset(src, relativePath)" ref="root" class="lazyload">
    <slot/>
  </div>
</template>

<script setup>
// Lazy load with lazysizes with the plugin for bg images.
// https://github.com/aFarkas/lazysizes/issues/778#issuecomment-628499483
import 'lazysizes'
import 'lazysizes/plugins/unveilhooks/ls.unveilhooks'

import { getAsset } from '@/modules/utils'

// Define props.
const props = defineProps({
  src: String,
  relativePath: String
})
</script>
