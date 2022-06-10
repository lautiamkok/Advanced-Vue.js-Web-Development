<template>
  <h2>
    {{ title }}
  </h2>
  <p>{{ date }}</p>
  <div>
    <p v-html="excerpt"></p>
  </div>
</template>

<script setup>
// compiled away when <script setup> is processed.
const props = defineProps({
  title: String,
  excerpt: String,
  date: String
})
</script>
