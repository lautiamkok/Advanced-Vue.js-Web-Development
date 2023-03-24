<template>
  <h3 class="font-bold text-xl">
    Feedback
  </h3>
  <p>
    {{ useUppercase(message) }}
  </p>
  <slot />
</template>

<script setup>
const props = defineProps({
  message: {
    type: String
  }
})
</script>
