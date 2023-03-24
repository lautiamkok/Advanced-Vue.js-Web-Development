<template>
  <div>
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
  </div>
</template>

<script setup>
import useError from '@/composables/use-error'
import { useContext } from 'vite-ssr'

const { error } = useError()
const { initialState, writeResponse } = useContext()

if (import.meta.env.SSR) {
  initialState.error = error.value
  writeResponse({
    status: error.value.status,
    headers: {}
  })
}
</script>
