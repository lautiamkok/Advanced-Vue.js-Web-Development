<template>
  <h2>
    Cart
  </h2>
  <p>
    Total Items: {{ store.sumQuantity }}
  </p>
  <p>
    Total Unique Items: {{ store.uniqueLength }}
  </p>
  <p>
    Total Cost: $ {{ store.sumCost }}
  </p>
   <button @click="store.empty">
    Empty Cart
  </button>
  <ul v-if="items.length > 0">
   <li
      v-for="item in items"
      v-bind:key="item.id"
    >
      <cart-item
        v-bind:product=item
      />
    </li>
  </ul>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'

const store = useCartStore()
const items = computed(() => store.getItems)
</script>
