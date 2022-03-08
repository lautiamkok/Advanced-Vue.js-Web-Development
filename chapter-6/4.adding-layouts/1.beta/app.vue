<template>
  <div>
    <ul v-if="menu">
      <li v-for="(item, index) in menu">
        <router-link :to="item.path">{{ item.title }}</router-link>
      </li>
    </ul>
    <NuxtPage/>
  </div>
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
    title: 'Shop',
    path: '/shop'
  },
  {
    title: 'Blog',
    path: '/blog'
  },
  {
    title: 'Contact',
    path: '/contact'
  }
]
</script>
