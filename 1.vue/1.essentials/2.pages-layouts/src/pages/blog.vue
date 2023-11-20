<template>
  <div>
    <h2>
      {{ title }}
    </h2>
    <ul v-if="menu">
      <li v-for="(item, index) in menu">
        <router-link :to="item.path">
          {{ item.title }}
        </router-link>
      </li>
    </ul>

    <router-view :key="route.path" />
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
  }
]
</script>
