<template>
  <div v-if="error">
    <h2>
      {{ error.statusCode }} {{ error.name }} {{ error.path }}
    </h2>
    <p>
     {{ error.message }}
    </p>
    <pre v-if="dev">
      {{ error.stack }}
    </pre>
    <p>
      Please navigate to other routes to clear the error.
    </p>
    <router-link to="/" class="button">
      Navigate home
    </router-link>
  </div>
</template>

<script setup>
import { useErrorStore } from '@/stores/error'

const store = useErrorStore()
const error = ref(store.error)
const dev = import.meta.env.DEV

if (import.meta.env.SSR) {
  const ctx = useSSRContext()

  // Set the status code on the server side.
  ctx.statusCode = error.value.statusCode

  // Print the error to the window object. 
  // Optional as it is not in use.
  ctx.error = error.value 
}
</script>
