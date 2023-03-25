<template>
  <h2>
    Lazy-loading Images
  </h2>
  <ul>
    <!--
      Important:
      Must add some space between the images to lazy load them! 
    -->
    <li 
      v-for="image in images" 
      v-bind:key="image.alt"
      style="padding-bottom: 10em;" 
    >
      <h3>
        {{ image.alt }}
      </h3>
      <p>
        {{ image.src }}
      </p>
      <lazy-pic
        v-bind:src="image.src"
        v-bind:alt="image.alt"
        v-bind:relative-path="image.relativePath"
      />
    </li>
  </ul>
</template>

<script setup>
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
