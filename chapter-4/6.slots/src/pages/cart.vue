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
    v-slot="{ update, empty }"
    v-if="items.length > 0"
  >
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
  </cart-actions>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import cartItem from '@/components/cart-item.vue'
import cartActions from '@/components/cart-actions.vue'

const store = useStore()
const title = 'Cart'
const items = computed(() => store.getters['cart/getItems'])
const sumItems = computed(() => store.getters['cart/sumItems'])
const uniqueItems = computed(() => store.getters['cart/uniqueItems'])
const sumCosts = computed(() => store.getters['cart/sumCosts'])
</script>
