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
    title: 'Blog',
    path: '/blog'
  },
  {
    title: 'Contact',
    path: '/contact'
  },
  {
    title: 'Users (404 Demo 1)',
    path: '/users'
  },
  {
    title: 'Feedback (Error Demo 1)',
    path: '/feedback'
  },
  {
    title: 'Shop (Error Demo 2)',
    path: '/shop'
  },
  {
    title: 'Cart (Error Demo 3)',
    path: '/cart'
  }
]
</script>
