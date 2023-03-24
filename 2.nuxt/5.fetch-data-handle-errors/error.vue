<template>
  <site-header/>
  <nav-main/>
  <h2>
    {{ error.statusCode }} Error
  </h2>
  <p>
    {{ error.message }}
  </p>
  <div 
    v-if="error.stack" 
    v-html="error.stack"
  />
  <NuxtLink to="/" class="button">
    Navigate home
  </NuxtLink>
</template>

<script setup>
defineProps({
  error: Object
})
</script>
