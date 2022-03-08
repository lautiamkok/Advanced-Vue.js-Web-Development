<template>
  <h1>{{ title }}</h1>
  <p>{{ message }}</p>
  <p>{{ route.params.pathMatch }}</p>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const title = 'Page Not Found'
const message = route.params.message || 'Sorry, bad luck!'
</script>
