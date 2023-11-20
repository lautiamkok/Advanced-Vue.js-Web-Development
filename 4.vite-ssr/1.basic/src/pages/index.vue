<template>
  <p>
    {{ message }}
  </p>
  <p>
    Requiring images manually:
  </p>
  <img alt="R0003515" src="@/assets/images/R0003515.jpg" />
  <img alt="R0001844" src="/static/R0001844.jpg" />
</template>

<script setup>
const message = ref('Hello World!')
</script>
