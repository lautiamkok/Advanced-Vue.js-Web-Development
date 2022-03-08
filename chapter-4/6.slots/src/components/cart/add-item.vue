<template>
  <div ref="root">
    <slot
      v-bind:add="add"
      v-bind:change="change"
      v-bind:error="error"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { createPopper } from '@popperjs/core'
import { delay } from '@/modules/utils'

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

function change (event) {
  // Make sure to convert string number to numeric number.
  quantity.value = Number(event.target.value)
}

async function add () {
  if (quantity.value < props.min || quantity.value > props.max) {
    error.value = `Please input between ${props.min} - ${props.max} only`
    return
  }
  error.value = null

  // Emit the event.
  emit('add-quantity', quantity.value)

  // Display popper tooltip.
  const tooltip = root.value.querySelector('.tooltip-container')

  // Make the tooltip visible.
  tooltip.setAttribute('data-show', '')

  // We need to tell Popper to update the tooltip position
  // after we show the tooltip, otherwise it will be incorrect
  popperInstance.value.update()

  // Remove the tooltip after a timeout.
  await delay(3000)
  tooltip.removeAttribute('data-show')
}

// Create a reactive object for popper instance.
const popperInstance = ref(null)

// https://v3.vuejs.org/guide/composition-api-template-refs.html#template-refs
const root = ref(null)

onMounted(() => {
  const button = root.value.querySelector('.tooltip-context')
  const tooltip = root.value.querySelector('.tooltip-container')
  popperInstance.value = createPopper(button, tooltip, {
    placement: 'right',
    modifiers: [{
      name: 'offset',
      options: {
        offset: [0, 8]
      }
    }]
  })
})
</script>
