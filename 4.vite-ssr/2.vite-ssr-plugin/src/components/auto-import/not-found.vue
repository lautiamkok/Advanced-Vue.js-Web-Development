<template>
  <div>
    <h2>
      {{ status }} {{ title }}
    </h2>
    <p>
      {{ message }}
    </p>
  </div>
</template>

<script setup>
const status = 404
const title = 'Page Not Found'
const message = 'Sorry, bad luck!'
</script>
