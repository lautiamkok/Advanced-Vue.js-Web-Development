<template>
  <h2>
    <router-link :to="'/shop/' + product.slug">
      {{ product.title }}
    </router-link>
  </h2>

  <p>Unit price: {{ product.price }}</p>
  <p>Cost: {{ product.cost }}</p>

  <cart-update-item
    v-bind:min="product.min"
    v-bind:max="product.max"
    v-bind:quantity="product.quantity"
    v-on:update-quantity="update"
  />

  <cart-delete-item
    v-bind:id="product.id"
    v-on:delete-item="remove"
  />
</template>

<script setup>
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
