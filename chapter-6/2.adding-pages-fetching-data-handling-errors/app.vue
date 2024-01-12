<template>
  <nav v-if="menu">
    <ul>
      <li v-for="(item, index) in menu">
        <router-link :to="item.path">{{ item.title }}</router-link>
      </li>
    </ul>
  </nav>
  <NuxtPage/>
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
    title: 'Shop',
    path: '/shop'
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

useHead({
  titleTemplate: 'My App - %s',
  // or, instead:
  // titleTemplate: (title) => `My App - ${title}`,
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
  meta: [
    { name: 'description', content: 'My amazing site.' }
  ],
  bodyAttrs: {
    class: 'test'
  }
})
</script>
