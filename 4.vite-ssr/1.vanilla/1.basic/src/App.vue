<template>
  <ul v-if="menu">
    <li v-for="(item, index) in menu">
      <router-link :to="item.path">
        {{ item.title }}
      </router-link>
    </li>
  </ul>
  <router-view v-slot="{ Component }">
    <Suspense>
      <component :is="Component" />
    </Suspense>
  </router-view>
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
  }
]
</script>
