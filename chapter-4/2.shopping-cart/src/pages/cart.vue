<template>
  <h1>{{ title }}</h1>
  <p>Total Items: {{ store.getters.sumItems }} </p>
  <p>Total Unique Items: {{ store.getters.uniqueItems }}</p>
  <p>Total Cost: {{ store.getters.sumCosts }}</p>
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
// No need to import methods and components manually anymore for using
// unplugin-auto-import and unplugin-vue-components

// import { computed } from 'vue'
// import { useStore } from 'vuex'
// import cartItem from '@/components/cart-item.vue'
// import cartActions from '@/components/cart-actions.vue'

const store = useStore()
const title = 'Cart'
const items = computed(() => store.getters['getItems'])
// const items = computed(() => store.state.items)
</script>
