<template>
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
</template>

<script setup>
import { onErrorCaptured } from 'vue'

// https://router.vuejs.org/guide/advanced/composition-api.html#accessing-the-router-and-current-route-inside-setup
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

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

// Handle error - page/post not found or general errors.
onErrorCaptured (error => {
  console.log('name =', error.name)
  console.log('message =', error.message)
  console.log('statusCode =', error.statusCode)

  // Push to 404 or general error page.
  // 404 - Page Not Found
  // 400 - Bad Request
  // 500 - Internal Server Error
  const pathArray = route.path.substring(1).split('/')
  const name = error.statusCode === 404 ? 'all' : 'error'
  const params = {
    name: error.name,
    statusCode: error.statusCode,
    message: error.message,
    stack: error.stack
  }

  if (error.statusCode === 404) {
    params.all = pathArray
  } else {
    params.error = pathArray
  }
  
  router.push({
    name,
    params
  })

  // Return false to prevent the error from propagating further.
  return false
})
</script>
