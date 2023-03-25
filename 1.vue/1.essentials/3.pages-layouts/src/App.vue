<template>
  <component :is="layout">
    <h1>
      Pages and Layouts
    </h1>
    <ul v-if="menu">
      <li v-for="(item, index) in menu">
        <router-link  :to="item.path">
          {{ item.title }}
        </router-link >
      </li>
    </ul>
    <suspense>
      <router-view />
    </suspense>
  </component>
</template>

<script setup>
const menu = [
  {
    title: 'Home',
    path: '/'
  },
  {
    title: 'About (Middleware Layout)',
    path: '/about'
  },
  {
    title: 'Blog (Middleware Layout)',
    path: '/blog'
  },
  {
    title: 'Shop (Component Layout)',
    path: '/shop'
  }
]

// Import layouts.
import Default from '@/layouts/middleware/default.vue'
import Dark from '@/layouts/middleware/dark.vue'
import Light from '@/layouts/middleware/light.vue'

const route = useRoute()

// Create a lookup object to reference the components.
const layouts = {
  default: Default,
  light: Light,
  dark: Dark
}

// Return the referenced variable (e.g. "default") rather than the component
// name (e.g. "Default").
const layout = computed(() => layouts[route.meta.layout])
</script>
