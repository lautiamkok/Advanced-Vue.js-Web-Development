<template>
  <h1>{{ title }}</h1>
  <p>{{ route.params.message }}</p>
  <p>{{ route.params.statusCode }}</p>
  <p>{{ route.params.pathMatch }}</p>
  <p>{{ route.params.stack }}</p>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const title = route.params.name || 'Error'
</script>
