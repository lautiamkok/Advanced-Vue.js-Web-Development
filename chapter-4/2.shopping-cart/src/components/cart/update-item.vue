<template>
  <input
    type="number"
    v-model="quantity"
    v-on:keyup="update"
    v-on:change="update"
  />
  <span>{{ error }}</span>
</template>

<script setup>
// Define props.
const props = defineProps({
  max: Number,
  min: Number,
  userInput: Number
})

// Define emit events.
const emit = defineEmits(['update-quantity'])

// Define reactive objects.
const quantity = ref(props.userInput)
const error = ref(null)

function update () {
  if (quantity.value < props.min || quantity.value > props.max) {
    error.value = `Please input between ${props.min} - ${props.max} only`
    return
  }
  error.value = null

  // Emit the event.
  emit('update-quantity', quantity.value)
}
</script>
