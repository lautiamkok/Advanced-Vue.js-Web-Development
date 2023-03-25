<template>
  <p>
    {{ useUppercase(message) }}
  </p>
  <p>
    Requiring images manually from the `/src/assets/` folder can work only in components. For example:
  </p>
  <img alt="R0003515" src="@/assets/images/R0003515.jpg" />
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
