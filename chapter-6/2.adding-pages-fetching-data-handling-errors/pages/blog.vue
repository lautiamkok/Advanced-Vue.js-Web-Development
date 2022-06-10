<template>
  <div>
    <h1>{{ title }}</h1>
    <nav v-if="menu">
      <ul>
        <li v-for="(item, index) in menu">
          <router-link :to="item.path">{{ item.title }}</router-link>
        </li>
      </ul>
    </nav>
    <router-view :key="route.path"></router-view>
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
]
</script>
