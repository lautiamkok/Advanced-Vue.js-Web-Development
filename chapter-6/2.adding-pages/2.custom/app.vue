<template>
  <div>
    <nav v-if="menu">
      <ul>
        <li v-for="(item, index) in menu">
          <router-link :to="item.path">{{ item.title }}</router-link>
        </li>
      </ul>
    </nav>
    <router-view/>
  </div>
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
  console.log('stack =', error.stack)

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
      message: error.message,
      stack: error.stack
    },
  })

  // Return false to prevent the error from propagating further.
  return false
})
</script>
