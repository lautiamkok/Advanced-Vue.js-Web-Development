<template>
  <ul v-if="gallery !== null && gallery !== undefined">
    <li
      v-for="item in gallery"
      v-bind:key="item.id"
    >
      <img
        :alt="item.alt"
        :src="useAsset(item.src, item.relativePath)"
      />
    </li>
  </ul>
</template>

<script setup>
// Delay the code to show the loader.
function timeout (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
await timeout(3000)

// Define props.
const props = defineProps({
  gallery: {
    type: Object
  }
})
</script>
