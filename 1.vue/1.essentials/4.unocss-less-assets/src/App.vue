<template>
  <h1 class="text-2xl font-bold">
    UnoCSS, Less, Asset Serving  
  </h1>
  <ul v-if="menu">
    <li v-for="(item, index) in menu">
      <router-link :to="item.path" class="underline">
        {{ item.title }}
      </router-link>
    </li>
  </ul>
  <suspense>
    <router-view />
  </suspense>
  
  <CurrentBreakpoint />
</template>

<script setup>
const menu = [
  {
    title: 'Home',
    path: '/'
  },
  {
    title: 'Responsive Layouts',
    path: 'responsive'
  },
  {
    title: 'Assets',
    path: 'assets'
  },
]
</script>
