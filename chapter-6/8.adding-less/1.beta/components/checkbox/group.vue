<template>
  {{ label }}
  <input
    type="checkbox"
    v-bind:name="name"
    v-bind:checked="isChecked"
    v-bind:value="value"
    v-on:change="update"
  />
</template>

<script setup>
import { computed } from 'vue'

// Define props.
const props = defineProps({
  modelValue: {
    type: Array,
    default: []
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
    default: '',
    required: true
  }
})

// Define emit events.
const emit = defineEmits(['update:modelValue'])

// Check if the checkbox is checked or not.
const isChecked = computed(() => {
  if (props.modelValue instanceof Array === false) {
    return
  }
  return props.modelValue.includes(props.value)
})

// Emit the event.
function update (event) {
  const isChecked = event.target.checked
  const values = [...props.modelValue]
  if (isChecked) {
    values.push(props.value)
  } else {
    values.splice(values.indexOf(props.value), 1)
  }
  emit('update:modelValue', values)
}
</script>
