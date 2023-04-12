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
const title = 'Blog'
const menu = [
  {
    title: 'Post 1',
    path: '/blog/post-1'
  },
  {
    title: 'Post 2',
    path: '/blog/post-2'
  },
  {
    title: 'Post 3',
    path: '/blog/post-3'
  },
  {
    title: 'Post 4 (error demo)',
    path: '/blog/post-4'
  }
]
</script>
