<template>
  <div>
    <h2>
      {{ title }}
    </h2>
    <ul v-if="menu">
      <li v-for="(item, index) in menu">
        <NuxtLink :to="item.path">
          {{ item.title }}
        </NuxtLink>
      </li>
    </ul>

    <!--
      Using nested routes.
      https://nuxt.com/docs/guide/directory-structure/pages#nested-routes 
    -->
    <NuxtPage :page-key="route.path" />
  </div>
</template>

<script setup>
const route = useRoute()
const title = 'Shop'
const menu = [
  {
    title: 'Product 1',
    path: '/shop/product-1'
  },
  {
    title: 'Product 2',
    path: '/shop/product-2'
  },
  {
    title: 'Product 3',
    path: '/shop/product-3'
  },
  {
    title: 'Product 4 (error demo)',
    path: '/shop/product-4'
  }
]
</script>
