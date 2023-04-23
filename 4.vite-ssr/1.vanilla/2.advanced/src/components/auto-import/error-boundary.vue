<template>
  <!-- 
    Wrap up this component to avoid:
    "Extraneous non-props attributes (id) were passed to component but could not
     be automatically inherited because component renders fragment or text root
     nodes."
    
    Or, use `inheritAttrs: false`:
    https://vuejs.org/guide/components/attrs.html#attribute-inheritance
  -->
  <div>
    <div v-if="error">
      <h2>
        {{ error.statusCode }} {{ error.name }}
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
    <slot v-else />
  </div>
</template>

<script setup>
import { useSSRContext } from 'vue'
const { error } = useError()

// https://vitejs.dev/guide/env-and-mode.html#env-variables
const dev = import.meta.env.DEV

if (import.meta.env.SSR) {
  const ctx = useSSRContext()

  ctx.error = error.value
  ctx.statusCode = error.value.statusCode
}
</script>
