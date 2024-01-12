<template>
  <div :data-background-image="getAsset(src, relativePath)" ref="root">
    <slot/>
  </div>
</template>

<script setup>
import lozad from 'lozad'
import { ref, onMounted } from 'vue'
import { getAsset } from '@/modules/utils'

// Define props.
const props = defineProps({
  src: String,
  relativePath: String
})

// Create a template root reference.
// https://vuejs.org/guide/essentials/template-refs.html#template-refs
const root = ref(null)

onMounted(() => {
  // the DOM element will be assigned to the ref after initial render
  console.log(root.value) // this is your $el

  // Target the root (the element), otherwise set class="lozad" to the element.
  const observer = lozad(root.value)
  observer.observe()
})
</script>
