<template>
  <h2>
    <router-link :to="usePath(product.slug)">
      {{ product.title }}
    </router-link>
  </h2>
  <lazy-image
    v-bind:src="product.thumbnail.src"
    v-bind:alt="product.thumbnail.alt"
    v-bind:relative-path="product.meta.relativePath"
  />
  <p>&#36;{{ product.price }}</p>
  <div>
    <p v-html="product.excerpt"></p>
  </div>
  <cart-add-item
    v-bind:min="product.min"
    v-bind:max="product.max"
    v-on:add-quantity="add"
  />
</template>

<script setup>
import { useStore } from 'vuex'
import usePath from '@/composables/use-path'
import cartAddItem from '@/components/cart/add-item.vue'
import lazyImage from '@/components/lazy/image.vue'

const store = useStore()

// Define props.
const props = defineProps({
  product: Object
})

// Handle emitted value from the event.
function add (value) {
  // Delete the gallery key from the product.
  const product = props.product
  delete product.gallery

  // Use toFixed to make sure only 2 decimals in the cost.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
  const cost = value * product.price
  const order = {
    quantity: value,
    cost: cost.toFixed(2),
    timestamp: Date.now()
  }

  // Merge object properties with the spread operator.
  store.dispatch('cart/addItem', { ...product, ...order })
}
</script>
