<template>
  <div>
    <nav v-if="menu">
      <ul>
        <li v-for="(item, index) in menu">
          <!-- <router-link :to="item.path">{{ item.title }}</router-link> -->
          <nuxt-link :to="item.path">{{ item.title }}</nuxt-link>
        </li>
      </ul>
    </nav>
    <!-- <router-view/> -->
    <NuxtPage/>
  </div>
</template>

<script setup>
// import { onErrorCaptured } from 'vue'

// https://router.vuejs.org/guide/advanced/composition-api.html#accessing-the-router-and-current-route-inside-setup
// import { useRouter, useRoute } from 'vue-router'
// const router = useRouter()
// const route = useRoute()

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
</script>
