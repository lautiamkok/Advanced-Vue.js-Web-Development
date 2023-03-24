<template>
  <h2>{{ title }}</h2>
  <ul>
    <li v-for="(item, index) in menu">
      <NuxtLink :to="item.path">
        {{ item.title }}
      </NuxtLink>
    </li>
  </ul>
  <router-view :key="route.path"></router-view>
</template>

<script setup>
const route = useRoute()
const title = 'Blog'
const menu = [
  {
    title: 'Post 1',
    path: '/blog/1'
  },
  {
    title: 'Post 2',
    path: '/blog/2'
  },
  {
    title: 'Post 3 (Error Demo)',
    path: '/blog/200'
  },
]
</script>
