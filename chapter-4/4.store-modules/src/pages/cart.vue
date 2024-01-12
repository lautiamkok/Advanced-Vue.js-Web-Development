<template>
  <h1>{{ title }}</h1>
  <p>Total Items: {{ sumItems }} </p>
  <p>Total Unique Items: {{ uniqueItems }}</p>
  <p>Total Cost: {{ sumCosts }}</p>
  <li
    v-for="item in items"
    v-bind:key="item.id"
    v-if="items.length > 0"
  >
    <cart-item
      v-bind:product=item
    />
  </li>

  <cart-actions
     v-if="items.length > 0"
  />
</template>

<script setup>
const store = useStore()
const title = 'Cart'
const items = computed(() => store.getters['cart/getItems'])
const sumItems = computed(() => store.getters['cart/sumItems'])
const uniqueItems = computed(() => store.getters['cart/uniqueItems'])
const sumCosts = computed(() => store.getters['cart/sumCosts'])
</script>
