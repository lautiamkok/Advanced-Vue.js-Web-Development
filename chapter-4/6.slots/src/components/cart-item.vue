<template>
  <h2>
    <router-link :to="'/shop/' + product.slug">
      {{ product.title }}
    </router-link>
  </h2>

  <p>Unit price: {{ product.price }}</p>
  <p>Cost: {{ product.cost }}</p>

  <cart-update-item
    v-slot="{ update, error }"
    v-bind:min="product.min"
    v-bind:max="product.max"
    v-on:update-quantity="update"
  >
    <input
      type="number"
      v-bind:value="product.quantity"
      v-on:keyup="update"
      v-on:change="update"
    />
    <span>{{ error }}</span>
  </cart-update-item>

  <cart-delete-item
    v-slot="{ remove }"
    v-bind:id="product.id"
    v-on:delete-item="remove"
  >
    <button v-on:click.prevent="remove">
      Delete
    </button>
  </cart-delete-item>
</template>

<script setup>
import usePath from '@/composables/use-path'

const store = useStore()

// Define props.
const props = defineProps({
  product: Object
})

// Handle emitted value from the event.
function remove (item) {
  store.dispatch('cart/deleteItem', item)
}

function update (value) {
  // Delete the gallery key from the product.
  const product = props.product
  delete product.gallery

  // Use toFixed to make sure only 2 decimals in the cost.
  const cost = value * product.price
  const order = {
    quantity: value,
    cost: cost.toFixed(2),
    timestamp: Date.now()
  }

  // Merge object properties with the spread operator.
  store.dispatch('cart/updateItem', { ...product, ...order })
}
</script>
