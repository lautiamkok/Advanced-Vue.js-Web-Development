<template>
  <!-- <input
    type="text"
    v-bind:value="modelValue"
    v-on:input="emit('update:modelValue', $event.target.value)"
  /> -->
  <input
    v-bind:type="type"
    v-bind:value="modelValue"
    v-bind:name="name"
    v-on:input="update"
  />
  <span>{{ modelValue }}</span>
</template>

<script setup>
// Define props.
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  }
})

// Define emit events.
const emit = defineEmits(['update:modelValue'])

// Emit the event.
function update (event) {
  emit('update:modelValue', event.target.value)
}
</script>
