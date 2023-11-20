<template>
  <h1>
    Components, Composables, plugins, and Utils
  </h1>
  <ul v-if="menu">
    <li v-for="(item, index) in menu">
      <router-link  :to="item.path">
        {{ item.title }}
      </router-link >
    </li>
  </ul>
  <suspense>
    <router-view />
  </suspense>
</template>

<script setup>
const menu = [
  {
    title: 'Home',
    path: '/'
  },
  {
    title: 'Props & Emit Data',
    path: '/emit'
  },
  {
    title: 'Lazy Components',
    path: '/lazy-components'
  },
  {
    title: 'Lazy Images',
    path: '/lazy-images'
  }
]
</script>
