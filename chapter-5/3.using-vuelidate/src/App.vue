<template>
  <nav v-if="menu">
    <ul>
      <li v-for="(item, index) in menu">
        <router-link :to="item.path">{{ item.title }}</router-link>
      </li>
    </ul>
  </nav>
  <router-view/>
</template>

<script setup>
const menu = [
  {
    title: 'Home',
    path: '/'
  },
  {
    title: 'Contact',
    path: '/contact'
  }
]
</script>
