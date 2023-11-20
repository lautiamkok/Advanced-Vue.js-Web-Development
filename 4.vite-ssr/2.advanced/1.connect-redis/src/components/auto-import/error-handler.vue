<template>
  <div>
    <h2>
       {{ error.statusCode }} {{ error.name }} {{ error.path }}
    </h2>
    <p>
     {{ error.message }}
    </p>
    <pre v-if="dev && error.stack">
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
import { useSSRContext } from 'vue'

// https://vitejs.dev/guide/env-and-mode.html#env-variables
const dev = import.meta.env.DEV

// Define props.
const props = defineProps({
  error: {
    type: [Object, Boolean]
  }
})

// Inject error path to the error object.
const route = useRoute()
const err = reactive(props.error || {})
err.path = route.path

// Normalize error.
const error = ref(props.error ? normalizeError(err) : false)

// Send the error data to the server to be injected into the `window` object.
if (import.meta.env.SSR) {
  const ctx = useSSRContext()

  ctx.error = error.value
  ctx.statusCode = error.value.statusCode
}

// Read the error data from the `window` object.
if (!import.meta.env.SSR) {
  const errorClient = window.context.error
  if (errorClient 
    && !isEmptyObject(errorClient)
    && errorClient.path === route.path
  ) {
    error.value = errorClient
  }
}
</script>
