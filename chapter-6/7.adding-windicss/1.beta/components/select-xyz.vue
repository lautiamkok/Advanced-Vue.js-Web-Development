<template>
  {{ label }}
  <select
    ref="root"
    v-on:change="update"
  >
    <slot/>
  </select>
</template>

<script setup>
import { ref, onMounted } from 'vue'

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
  label: {
    type: String,
    required: true
  }
})

// Define emit events.
const emit = defineEmits(['update:modelValue'])

// Emit the event.
function update (event) {
  emit('update:modelValue', event.target.value)
}

// https://v3.vuejs.org/guide/composition-api-template-refs.html#template-refs
const root = ref(null)
onMounted(() => {
  if (!props.modelValue) {
    return
  }
  const options = Array.from(root.value.options)
  options.find(element => element.value == props.modelValue).selected = true
})
</script>
