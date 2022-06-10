<template>
  <div>
    <h1>{{ title }}</h1>
    {{ items }}
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
// Bind a key the <router-view> so that Vue won't reuse the component.
// So that the content can be updated when route has changed.
import { useRoute } from 'vue-router'
import useMany from '@/composables/use-many'

const route = useRoute()

const { items } = useMany()
console.log('items =', items.value)

items.value = ['blog']

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
