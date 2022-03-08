<template>
  <h1>{{ title }}</h1>
  <p>{{ route.params.message }}</p>
  <p>{{ route.params.statusCode }}</p>
  <p>{{ route.params.pathMatch }}</p>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const title = route.params.name || 'Error'
</script>

<script>
export default {
  props: ['error'],
  // layout: 'blog' // you can set a custom layout for the error page
}
</script>
