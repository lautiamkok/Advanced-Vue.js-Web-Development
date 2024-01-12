<template>
  <slot
    v-bind:update="update"
    v-bind:error="error"
  />
</template>

<script setup>
// Define props.
const props = defineProps({
  max: Number,
  min: Number
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
