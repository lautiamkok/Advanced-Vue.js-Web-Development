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
// Use this component for unknown routes only and returns 404.
import { useContext } from 'vite-ssr'

const { writeResponse } = useContext()
if (import.meta.env.SSR) {
  writeResponse({
    status: 404,
    headers: {}
  })
}
</script>
