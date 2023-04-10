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
    title: 'Counter (cookie)',
    path: '/counter'
  },
  {
    title: 'Shop (localstorage)',
    path: '/shop'
  },
  {
    title: 'Cart (localstorage)',
    path: '/cart'
  }
]
</script>
