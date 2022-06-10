<template>
  <p> layout: {{ layout }} </p>
  <component :is="layouts[layout]">
    <nav v-if="menu">
      <ul>
        <li v-for="(item, index) in menu">
          <router-link :to="item.path">{{ item.title }}</router-link>
        </li>
      </ul>
    </nav>
    <suspense>
      <router-view/>
    </suspense>
  </component>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import useLayout from '@/composables/use-layout'

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
const { layout } = useLayout()

// Reset layout when route changes.
watch(
  () => route.path,
  path => {
    if (route.meta.layout === undefined) {
      layout.value = 'default'
    }
  }
)

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
    title: 'Product 1',
    path: '/shop/product-1'
  },
  {
    title: 'Product 2',
    path: '/shop/product-2'
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
