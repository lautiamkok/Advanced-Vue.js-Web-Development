<template>
  <h3 class="font-bold text-xl">
    Comment
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

// You can use useUppercase directly in <template> if it is placed inside the
// `/composables/auto-complete/` folder. If it is outside that folder, then you
// only can use it in the <script> block as follows:

// const message = computed(() => useUppercase(props.message))
</script>
