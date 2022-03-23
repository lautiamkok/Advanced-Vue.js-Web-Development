<template>
  <nav v-if="menu">
    <router-link
      :to="item.path"
      v-for="(item, index) in menu"
    >
    {{ item.title }} /
    </router-link>
  </nav>
  <!-- <router-view v-slot="{ Component }">
    <Suspense>
      <component :is="Component" />
    </Suspense>
  </router-view> -->
  <suspense>
    <router-view/>
  </suspense>
</template>

<script setup>
import { onErrorCaptured } from 'vue'
import { throwError } from '@/modules/utils'

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
    title: 'Blog',
    path: '/blog'
  },
  {
    title: 'Contact',
    path: '/contact'
  }
]

// Handle error on the client or server side - page/post not found.
onErrorCaptured (error => {
  // Option 1: Only the server handles the error.
  // Reload the page so the app is reloaded on the server side so that Express
  // can handle all the error.
  // if (!import.meta.env.SSR) {
  //   location.reload()
  // }

  // console.log('name =', error.name)
  // console.log('message =', error.message)
  // console.log('statusCode =', error.statusCode)
  // console.log('stack =', error.stack)

  // Option 2: Only the client handles the error.
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
    }
  })

  // Throw the error again so that it can be captured in the app level.
  throwError(error.message, error.statusCode || 500)

  // Return false to prevent the error from propagating further.
  // return false

  // Option 3: Both client and server handle the error.
  // Don't return false if you want Express to handle the error when the app is
  // running on the server side.
  // if (!import.meta.env.SSR) {
  //   return false
  // }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
