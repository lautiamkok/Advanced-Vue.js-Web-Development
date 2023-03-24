<template>
  <ul v-if="menu">
    <li v-for="(item, index) in menu">
      <router-link :to="item.path">
        {{ item.title }}
      </router-link>
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
    title: 'About',
    path: '/about'
  },
  {
    title: 'Users',
    path: '/users'
  },
  {
    title: 'Blog (404 Demo 1)',
    path: '/blog'
  },
  {
    title: 'Contact (Error Demo 1)',
    path: '/contact'
  },
  {
    title: 'Login (Error Demo 2)',
    path: '/login'
  },
  {
    title: 'Cart (Error Demo 3)',
    path: '/cart'
  }
]
</script>
