<template>
  <h2>
    Shop
  </h2>
  <ul v-if="!error">
    <button @click="store.empty">
      Empty Cart
    </button>
    <li 
      v-for="product in data.products" 
      :key="product.id"
    >
      <product-item
        v-bind:product=product
      />
    </li>
  </ul>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'

const store = useCartStore()
const { data, error } = await useF3tch(`/products/?limit=10`)
</script>
