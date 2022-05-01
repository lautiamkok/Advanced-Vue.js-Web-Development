<template>
  <nav v-if="menu">
    <ul>
      <li v-for="(item, index) in menu">
        <router-link :to="item.path">{{ item.title }}</router-link>
      </li>
    </ul>
  </nav>
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
  }
]
</script>
