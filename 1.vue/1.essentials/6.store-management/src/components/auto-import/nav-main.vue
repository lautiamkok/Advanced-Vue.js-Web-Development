<template>
  <ul v-if="menu">
    <li v-for="(item, index) in menu">
      <router-link  :to="item.path">
        {{ item.title }}
      </router-link >
    </li>
  </ul>
</template>

<script setup>
const menu = [
  {
    title: 'Home',
    path: '/'
  },
  {
    title: 'Counter',
    path: '/counter'
  },
  {
    title: 'Shop',
    path: '/shop'
  },
  {
    title: 'Cart',
    path: '/cart'
  }
]
</script>
