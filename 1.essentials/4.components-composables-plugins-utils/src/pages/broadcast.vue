<template>
  <h2>
    Broadcasting Data with Composables
  </h2>
  <p>
    {{ state }}
  </p>
  <button-broadcast />
</template>

<script setup>
const state = useState()
</script>
