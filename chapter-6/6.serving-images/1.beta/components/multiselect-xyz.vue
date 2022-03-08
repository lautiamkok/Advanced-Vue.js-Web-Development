<template>
  {{ label }}
  <select
    ref="root"
    v-on:change="update"
    multiple
  >
    <slot/>
  </select>
</template>

<script setup>
import { ref, onMounted } from 'vue'

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
  label: {
    type: String,
    required: true
  }
})

// Define emit events.
const emit = defineEmits(['update:modelValue'])

// Emit the event.
function update (event) {
  const options = event.target.selectedOptions
  const values = Array.from(options).map(({ value }) => value)
  emit('update:modelValue', values)
}

const root = ref(null)
onMounted(() => {
  if (props.modelValue instanceof Array === false) {
    return
  }
  // Array#from transforms an array-like object into an array
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
  const options = Array.from(root.value.options)
  props.modelValue.forEach(value => {
    options.find(element => element.value == value).selected = true
  })
})
</script>
