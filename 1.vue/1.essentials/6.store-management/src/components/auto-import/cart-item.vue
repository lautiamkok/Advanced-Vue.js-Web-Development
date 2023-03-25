<template>
  <h3>
    {{ product.title }}
  </h3>
  <p>
    <img 
      :alt="product.title" 
      :src="product.thumbnail" 
    />
  </p>
  <p>
    Unit Price: $ {{ product.price }}
  </p>
  <p>
    Total Cost: $ {{ product.sum }}
  </p>
  <input 
    v-model="quantity" 
    type="number" 
    min="1" 
    max="{{ product.stock }}"
  />
  <button @click="update">
    Update
  </button>
  <button @click="remove">
    Remove
  </button>
  <span v-if="error">
    &nbsp; {{ error }}
  </span>
  <span v-if="
    store.response.message && 
    store.response.data && 
    store.response.data.id === product.id
  ">
    &nbsp; {{ store.response.message }}
  </span>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
const store = useCartStore()

// Define props.
const props = defineProps({
  product: Object
})

const error = ref(null)
const quantity = ref(props.product.quantity)

function remove () {
  store.deleteItem(props.product)
}

function update () {
  if (quantity.value < 1 || quantity.value > props.product.stock) {
    error.value = `Please input between 1 - ${props.product.stock} only`
    return
  }
  error.value = null

  // Use toFixed to make sure only 2 decimals in the cost.
  const cost = quantity.value * props.product.price
  const order = {
    quantity: quantity.value,
    cost: cost.toFixed(2),
    timestamp: Date.now()
  }

  // Merge object properties with the spread operator.
  store.updateItem({ ...props.product, ...order })
}
</script>
