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
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { createPopper } from '@popperjs/core'
import { delay } from '@/modules/utils'

const store = useStore()
const items = store.getters['cart/getItems']
const title = 'Cart'

// The current official way in accessing state, getters, mutations, and actions.
// https://next.vuex.vuejs.org/guide/composition-api.html

// If you need to compose the action with other logic then it is probably not a
// good idea to mix the Composition APIs with the Options APIs.
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

// function empty (event) {
//   store.dispatch('cart/empty')
// }

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

<script>
// Mixing Composition APIs with Options APIs is not good for complex methods.
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('cart', [
      'empty',
      // 'update'
    ]),

    ...mapActions('cart', {
      emptyCart: 'empty',
      // updateCart: 'update'
    }),

    empty () {
      this.emptyCart().then(() => {
        console.log('empty completed')
      })
    }
  }
}
</script>
