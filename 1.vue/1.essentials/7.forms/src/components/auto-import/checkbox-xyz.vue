<template>
  {{ label }}
  <input
    type="checkbox"
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
  name: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    required: true
  },
  trueValue: {
    default: true
  },
  falseValue: {
    default: false
  }
})

// Define emit events.
const emit = defineEmits(['update:modelValue'])

// Check if the checkbox is checked or not.
// Note that `true-value` and `false-value` are camelCase in the JS.
const isChecked = computed(() => props.modelValue === props.trueValue)

// Emit the event.
function update (event) {
  const isChecked = event.target.checked
  emit('update:modelValue', isChecked ? props.trueValue : props.falseValue)
}
</script>
