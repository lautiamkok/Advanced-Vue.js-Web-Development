<template>
  <!--
    Set a top-level layout here.
    https://nuxt.com/docs/guide/directory-structure/layouts#layouts-directory
  -->
  <NuxtLayout>
    <h1>
      Layouts and Pages
    </h1>
    <ul v-if="menu">
      <li v-for="(item, index) in menu">
        <NuxtLink :to="item.path">
          {{ item.title }}
        </NuxtLink>
      </li>
    </ul>
    <NuxtPage/>
  </NuxtLayout>
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
    title: 'Shop (Per-page Layout)',
    path: '/shop'
  }
]
</script>
