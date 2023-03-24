<template>
  <h1 class="text-2xl font-bold">
    Image Serving, Adding WindiCSS and LESS
  </h1>
  <ul v-if="menu">
    <li v-for="(item, index) in menu">
      <NuxtLink :to="item.path" class="underline">
        {{ item.title }}
      </NuxtLink>
    </li>
  </ul>
  <NuxtPage/>
</template>

<script setup>
const menu = [
  {
    title: 'Home',
    path: '/'
  },
  {
    title: 'Assets',
    path: 'assets'
  }
]
</script>
