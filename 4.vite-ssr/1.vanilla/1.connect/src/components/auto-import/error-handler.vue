<template>
  <h2>
    {{ error.status }} Error
  </h2>
  <p>
   {{ error.name }} - {{ error.message }}
  </p>
  <pre>
    {{ error.stack }}
  </pre>
  <p>
    Please navigate to other routes to clear the error.
  </p>
  <router-link to="/" class="button">
    Navigate home
  </router-link>
</template>

<script setup>
import { useSSRContext } from 'vue'
const { error } = useError()

if (import.meta.env.SSR) {
  const ctx = useSSRContext()

  ctx.error = error.value
  ctx.httpStatus = error.value.status
}
</script>
