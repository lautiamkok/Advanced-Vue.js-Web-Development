<template>
  <ul v-if="menu">
    <li v-for="(item, index) in menu">
      <NuxtLink :to="item.path">
        {{ item.title }}
      </NuxtLink>
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
    title: 'Contact (Error Demo 1)',
    path: '/contact'
  },
  {
    title: 'Login (Error Demo 2)',
    path: '/login'
  },
  {
    title: 'Profile (Error Demo 3: slot)',
    path: '/profile'
  },
  {
    title: 'Cart (Error Demo 4: if-else)',
    path: '/cart'
  }
]
</script>
