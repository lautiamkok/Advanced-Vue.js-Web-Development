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
// Define props. defineProps and defineEmits do not need to be imported, and are
// compiled away when <script setup> is processed.
const props = defineProps({
  title: String,
  excerpt: String,
  date: String
})
</script>
