<template>
  <nav v-if="menu">
    <router-link
      :to="item.path"
      v-for="(item, index) in menu"
    >
    {{ item.title }} /
    </router-link>
  </nav>
  <suspense>
    <router-view/>
  </suspense>
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
    title: 'Contact',
    path: '/contact'
  }
]

// Set default head.
// https://github.com/vueuse/head
useHead({
  title: '',
  meta: [
    {
      name: 'description',
      content: ''
    },
    {
      property: 'og:type',
      content: 'article'
    },
    {
      property: 'og:url',
      content: ''
    },
    {
      property: 'og:title',
      content: ''
    },
    {
      property: 'og:description',
      content: ''
    },
    {
      property: 'og:image',
      content: ''
    },
    {
      property: 'og:image:width',
      content: ''
    },
    {
      property: 'og:image:height',
      content: ''
    },
    {
      property: 'fb:app_id',
      content: ''
    },
    {
      name: 'twitter:site',
      content: ''
    },
    {
      name: 'twitter:creator',
      content: ''
    },
    {
      name: 'twitter:card',
      content: ''
    },
    {
      name: 'twitter:description',
      content: ''
    },
  ],
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
