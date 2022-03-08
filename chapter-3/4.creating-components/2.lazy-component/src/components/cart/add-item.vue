<template>
  <input v-model="quantity">
  <!-- <input v-model="quantity" type="number"> -->
  <button v-on:click.prevent="add">
    Add
  </button>
  {{ error }}
</template>

<script setup>
import { ref, watch } from 'vue'
import { isNum } from '@/modules/utils'

// Define props.
const props = defineProps({
  max: Number,
  min: Number
})

// Define emit events.
const emit = defineEmits(['add-quantity'])

// Define reactive objects.
const quantity = ref(props.min)
const error = ref(null)

// Watch a ref object directly.
// https://v3.vuejs.org/guide/reactivity-computed-watchers.html#watch
watch(quantity, (newVal, prevVal) => {
    const number = parseInt(newVal)
    if (isNum(number)) {
      quantity.value = number
      return
    }
    quantity.value = prevVal
  }
)

function add () {
  if (quantity.value < props.min || quantity.value > props.max) {
    error.value = `Please input between ${props.min} - ${props.max} only`
    return
  }
  error.value = null

  // Emit the event.
  emit('add-quantity', quantity.value)
}
</script>
