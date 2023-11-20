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
    {{ product.description }}
  </p>
  <p>
    $ {{ product.price }}
  </p>
  <p>
    Stock: {{ product.stock }}
  </p>
  <input 
    v-model="quantity" 
    type="number" 
    min="1" 
    max="{{ product.stock }}" 
  />
  <button @click="add">
    Add to Cart
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
  product: {
    type: Object
  }
})

const error = ref(null)
const quantity = ref(1)

function add () {
  if (quantity.value < 1 || quantity.value > props.product.stock) {
    error.value = `Please input between 1 - ${props.product.stock} only`
    return
  }
  error.value = null

  // Use toFixed to make sure only 2 decimals in the cost.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
  const cost = quantity.value * props.product.price
  const order = {
    quantity: quantity.value,
    cost: cost.toFixed(2),
    timestamp: Date.now()
  }

  // Merge object properties with the spread operator.
  store.addItem({ ...props.product, ...order })
}
</script>
