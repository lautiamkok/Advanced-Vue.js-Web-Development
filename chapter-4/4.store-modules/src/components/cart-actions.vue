<template>
  <div ref="root">
    <button
      v-on:click.prevent="update"
      class="tooltip-context"
    >Update Cart</button>
    <button
      v-on:click.prevent="empty"
    >Empty Cart</button>
    <div class="tooltip-container">
      <div class="arrow" data-popper-arrow></div>
      <span>Your cart has been updated.</span>
    </div>
  </div>
</template>

<script setup>
import { createPopper } from '@popperjs/core'
import { delay } from '@/modules/utils'

const store = useStore()
const items = store.getters['cart/getItems']
const title = 'Cart'

async function update (event) {
  store.dispatch('cart/update', items)

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

function empty (event) {
  store.dispatch('cart/empty')
}

// Create a reactive object for popper instance.
const popperInstance = ref(null)

// Create a template root reference.
const root = ref(null)

onMounted(() => {
  // the DOM element will be assigned to the ref after initial render
  console.log(root.value)

  // Stop the process if no item in the cart.
  if (items.length === 0) {
    return
  }

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
