<template>
  {{ label }}
  <input
    type="radio"
    v-bind:name="name"
    v-bind:value="value"
    v-bind:checked="isChecked"
    v-on:change="update"
  />
</template>

<script setup>
import { computed } from 'vue'

// Define props.
const props = defineProps({
  modelValue: {
    default: ''
  },
  label: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  value: {
    type: String
  }
})

// Define emit events.
const emit = defineEmits(['update:modelValue'])

// Check if the radio is checked or not.
const isChecked = computed(() => props.modelValue === props.value)

// Emit the event.
function update (event) {
  emit('update:modelValue', event.target.value)
}
</script>
