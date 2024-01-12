<template>
  <component :is="layout">
    <nav v-if="menu">
      <ul>
        <li v-for="(item, index) in menu">
          <router-link :to="item.path">{{ item.title }}</router-link>
        </li>
      </ul>
    </nav>
    <router-view/>
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// Import layouts.
import Default from '@/layouts/default.vue'
import Dark from '@/layouts/dark.vue'
import Light from '@/layouts/light.vue'

const route = useRoute()

// Create a lookup object to reference the components.
const layouts = {
  default: Default,
  light: Light,
  dark: Dark
}

// Return the referenced variable rather than the component name.
const layout = computed(() => layouts[route.meta.layout || 'default'])

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
