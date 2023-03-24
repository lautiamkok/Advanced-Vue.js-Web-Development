<template>
  <h3>
    Blog Index
  </h3>
  <div 
    v-html="data.contents" 
    v-if="data" 
  />
</template>

<script setup>
import useData from '@/composables/use-data'
const { data } = useData()
</script>
