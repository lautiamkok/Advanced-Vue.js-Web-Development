<template>
  <input
    type="number"
    v-bind:value="quantity"
    v-on:keyup="update"
    v-on:change="update"
  />
  <span>{{ error }}</span>
</template>

<script setup>
import { ref } from 'vue'

// Define props.
const props = defineProps({
  max: Number,
  min: Number,
  quantity: Number
})

// Define emit events.
const emit = defineEmits(['update-quantity'])

// Define reactive objects.
const error = ref(null)

function update (event) {
  // Make sure to convert string number to numeric number.
  const value = Number(event.target.value)
  if (value < props.min || value > props.max) {
    error.value = `Please input between ${props.min} - ${props.max} only`
    return
  }
  error.value = null

  // Emit the event.
  emit('update-quantity', value)
}
</script>
