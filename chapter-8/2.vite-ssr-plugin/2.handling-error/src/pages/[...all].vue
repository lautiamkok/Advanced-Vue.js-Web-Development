<template>
  <not-found/>
</template>

<script setup>
// https://github.com/frandiox/vite-ssr#editing-response-and-redirects
import { useContext } from 'vite-ssr'

const { writeResponse } = useContext()
if (import.meta.env.SSR) {
  writeResponse({
    status: 404,
    headers: {}
  })
}
</script>
