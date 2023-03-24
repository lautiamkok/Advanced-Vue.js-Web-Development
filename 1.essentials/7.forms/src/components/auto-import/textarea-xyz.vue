<template>
  <!-- <textarea
    v-bind:value="modelValue"
    v-on:input="emit('update:modelValue', $event.target.value)"
  ></textarea> -->
  <textarea
    v-bind:value="modelValue"
    v-bind:name="name"
    v-bind:rows="rows"
    v-bind:cols="cols"
    v-on:input="update"
  ></textarea>
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
  rows: {
    type: String,
    default: '4'
  },
  cols: {
    type: String,
    default: '50'
  }
})

// Define emit events.
const emit = defineEmits(['update:modelValue'])

// Emit the event.
function update (event) {
  emit('update:modelValue', event.target.value)
}
</script>
