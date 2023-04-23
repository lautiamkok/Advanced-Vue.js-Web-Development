<template>
  <slot v-if="isClient" />
</template>

<script setup>
const isClient = ref(false)

onMounted(() => {
  isClient.value = true
})
</script>
