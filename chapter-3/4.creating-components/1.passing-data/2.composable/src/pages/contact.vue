<template>
  <h1>{{ title }}</h1>
  {{ items }}
</template>

<script setup>
import useMany from '@/composables/use-many'

const title = 'Contact'
const { items } = useMany()

console.log('items =', items.value)
items.value = ['world']
</script>
