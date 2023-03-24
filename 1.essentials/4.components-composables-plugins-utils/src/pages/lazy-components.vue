<template>
  <h2>
    Lazy-loading Components
  </h2>
  <button v-on:click.prevent="toggleReveal">
    Toggle Reveal
  </button>
  <Suspense v-if="gallery === true">
    <template #default>
      <lazy-gallery v-bind:gallery="images" />
    </template>
    <template #fallback>
      <p>
        Loading...
      </p>
    </template>
  </Suspense>
</template>

<script setup>
const gallery = ref(false)

// Define the lazy-load component.
const lazyGallery = defineAsyncComponent(() =>
  import('@/components/lazy/gallery.vue')
)

// Toggle the value.
function toggleReveal () {
  gallery.value = !gallery.value
}

const images = [
  {
    src: 'R0000096.jpg',
    alt: 'R0000096',
    relativePath: ''
  },
  {
    src: 'R0000166.jpg',
    alt: 'R0000166',
    relativePath: ''
  },
  {
    src: 'R0000261.jpg',
    alt: 'R0000261',
    relativePath: ''
  },
  {
    src: 'R0001844.jpg',
    alt: 'R0001844',
    relativePath: ''
  },
  {
    src: 'R0003303.jpg',
    alt: 'R0003303',
    relativePath: ''
  },
  {
    src: 'R0003515.jpg',
    alt: 'R0003515',
    relativePath: ''
  },
  {
    src: 'R0007588.jpg',
    alt: 'R0007588',
    relativePath: ''
  },
  {
    src: 'R0007856.jpg',
    alt: 'R0007856',
    relativePath: ''
  },
  {
    src: 'R0007866.jpg',
    alt: 'R0007866',
    relativePath: ''
  },
  {
    src: 'R0009300.jpg',
    alt: 'R0009300',
    relativePath: ''
  },
  {
    src: 'R0009791.jpg',
    alt: 'R0009791',
    relativePath: ''
  },
    {
    src: 'R0009824.jpg',
    alt: 'R0009824',
    relativePath: ''
  },
]
</script>
