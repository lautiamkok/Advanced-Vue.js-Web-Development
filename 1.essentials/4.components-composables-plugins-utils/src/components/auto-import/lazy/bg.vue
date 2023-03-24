<template>
  <div 
    :data-bg-img="useAsset(src, relativePath)" 
    ref="root"
  >
    <slot/>
  </div>
</template>

<script setup>
// Define props.
const props = defineProps({
  src: {
    type: String
  },
  relativePath: {
    type: String
  }
})

// Create a template root reference.
// https://vuejs.org/guide/essentials/template-refs.html#template-refs
const root = ref(null)

onMounted(() => {
  // the DOM element will be assigned to the ref after initial render
  console.log(root.value) // this is your $el

  const observer = new lazy(root.value)
  observer.observe()
})
</script>
