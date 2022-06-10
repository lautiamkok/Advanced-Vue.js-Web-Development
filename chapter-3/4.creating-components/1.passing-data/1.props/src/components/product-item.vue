<template>
  <h2>
    <router-link :to="usePath(product.slug)">
      {{ product.title }}
    </router-link>
  </h2>
  <p>&#36;{{ product.price }}</p>
  <div>
    <p v-html="product.excerpt"></p>
  </div>
  <add-item
    v-bind:min="product.min"
    v-bind:max="product.max"
    v-on:add-quantity="addQuantity"
  />
</template>

<script setup>
import usePath from '@/composables/use-path'
import addItem from '@/components/cart/add-item.vue'

// Define props.
const props = defineProps({
  product: Object
})

// Handle emitted value from the event.
function addQuantity (value) {
  alert(value)
}
</script>
