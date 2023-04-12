<template>
  <h2>
    Shop
  </h2>
  <ul v-if="data">
    <button @click="empty">
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
const { empty } = useCart()
const { data } = await useF3tch(`/products/?limit=10`, {
  baseURL: 'https://dummyjson.com'
})
</script>
