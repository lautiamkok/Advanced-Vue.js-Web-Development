<template>
  <div>
    <h2>{{ title }}</h2>
    <nav v-if="menu">
      <ul>
        <li v-for="(item, index) in menu">
          <nuxt-link :to="item.path">{{ item.title }}</nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
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
]
</script>
