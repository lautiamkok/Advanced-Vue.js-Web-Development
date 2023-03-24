<template>
  <div>
    <h2>
      404 Page Not Found
    </h2>
    <p>
      Sorry, bad luck!
    </p>
  </div>
</template>

<script setup>
import { useSSRContext } from 'vue'
if (import.meta.env.SSR) {
  const ctx = useSSRContext()
  ctx.httpStatus = 404
}
</script>
