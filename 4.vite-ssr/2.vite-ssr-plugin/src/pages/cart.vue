<template>
  <div>
    <h2>
      Cart
    </h2>
    <p>
      Total Items: {{ sumQuantity }}
    </p>
    <p>
      Total Unique Items: {{ uniqueLength }}
    </p>
    <p>
      Total Cost: $ {{ sumCost }}
    </p>
     <button @click="empty">
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
  </div>
</template>

<script setup>
const { items, empty, sumQuantity, uniqueLength, sumCost } = useCart()
</script>
