<template>
  <div>
    <h2>
      {{ title }}
    </h2>
    <ul v-if="menu">
      <li v-for="(item, index) in menu">
        <router-link :to="item.path">
          {{ item.title }}
        </router-link>
      </li>
    </ul>

    <router-view :key="route.path" />
  </div>
</template>

<script setup>
const route = useRoute()
const title = 'Shop'
const menu = [
  {
    title: 'Product 1',
    path: '/shop/product-1'
  },
  {
    title: 'Product 2',
    path: '/shop/product-2'
  },
  {
    title: 'Product 3',
    path: '/shop/product-3'
  }
]
</script>
