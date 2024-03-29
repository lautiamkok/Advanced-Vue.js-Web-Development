<template>
  <input
    type="number"
    v-bind:value="min"
    v-on:change="change"
  />
  <button
    class="tooltip-context"
    v-on:click.prevent="add"
    ref="popperButton"
  >
    Add
  </button>
  <div class="tooltip-container" ref="popperTooltip">
    <div class="arrow" data-popper-arrow></div>
    <span>This item has been added to your cart.</span>
  </div>
  {{ error }}
</template>

<script setup>
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

  // Make the tooltip visible.
  popperTooltip.value.setAttribute('data-show', '')

  // We need to tell Popper to update the tooltip position
  // after we show the tooltip, otherwise it will be incorrect
  popperInstance.value.update()

  // Remove the tooltip after a timeout.
  await delay(3000)
  if (popperTooltip.value === null) {
    return
  }
  popperTooltip.value.removeAttribute('data-show')
}

// Create reactive object for popper instance and elements.
const popperInstance = ref(null)
const popperButton = ref(null)
const popperTooltip = ref(null)

onMounted(() => {
  popperInstance.value = createPopper(popperButton.value, popperTooltip.value, {
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
