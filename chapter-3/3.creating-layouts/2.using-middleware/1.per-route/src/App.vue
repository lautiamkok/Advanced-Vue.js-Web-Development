<template>
  <div id="app">
    <component :is="layouts[route.meta.layout || 'default']">
      <nav v-if="menu">
        <ul>
          <li v-for="(item, index) in menu">
            <router-link :to="item.path">{{ item.title }}</router-link>
          </li>
        </ul>
      </nav>
      <router-view/>
    </component>
  </div>
</template>

<script setup>
import { computed, onErrorCaptured } from 'vue'

// https://router.vuejs.org/guide/advanced/composition-api.html#accessing-the-router-and-current-route-inside-setup
import { useRouter, useRoute } from 'vue-router'

// Import layouts.
import Default from '@/layouts/default.vue'
import Dark from '@/layouts/dark.vue'
import Light from '@/layouts/light.vue'

const router = useRouter()
const route = useRoute()

// Create a lookup object to reference the components.
const layouts = {
  default: Default,
  light: Light,
  dark: Dark
}

// Return the referenced variable rather than the component name.
// const layout = computed(() => layouts[route.meta.layout || 'default'])

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

// Handle error - page/post not found.
onErrorCaptured (error => {
  console.log('name =', error.name)
  console.log('message =', error.message)
  console.log('statusCode =', error.statusCode)

  // Push to 404 or general error page.
  // 404 - Page Not Found
  // 400 - Bad Request
  // 500 - Internal Server Error
  router.push({
    name: error.statusCode === 404 ? '404' : 'error',
    params: {
      pathMatch: route.path.substring(1).split('/'),
      name: error.name,
      statusCode: error.statusCode || 500,
      message: error.message
    },
  })

  // Return false to prevent the error from propagating further.
  // https://v3.vuejs.org/api/options-lifecycle-hooks.html#errorcaptured
  return false
})
</script>
