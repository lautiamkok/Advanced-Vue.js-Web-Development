<template>
  <!-- Only set a global <metainfo> component here with no `useMeta` default
       meta info set to avoid hydration mismatch -->
  <nav v-if="menu">
    <router-link
      :to="item.path"
      v-for="(item, index) in menu"
    >
    {{ item.title }} /
    </router-link>
  </nav>
  <suspense>
    <component :is="layout">
      <router-view/>
    </component>
  </suspense>
</template>

<script setup>
import { computed, onErrorCaptured } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

import { throwError } from '@/modules/utils'

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

// Import layouts.
import Default from '@/layouts/default.vue'
// add other layouts...

// Create a lookup object to reference the components.
const layouts = {
  default: Default,
  // add other layouts...
}

// Return the referenced variable rather than the component name.
const layout = computed(() => layouts['default'])

// Set default head.
// https://github.com/vueuse/head
useHead({
  title: '',
  meta: [
    {
      name: 'description',
      content: ''
    },
    {
      property: 'og:type',
      content: 'article'
    },
    {
      property: 'og:url',
      content: ''
    },
    {
      property: 'og:title',
      content: ''
    },
    {
      property: 'og:description',
      content: ''
    },
    {
      property: 'og:image',
      content: ''
    },
    {
      property: 'og:image:width',
      content: ''
    },
    {
      property: 'og:image:height',
      content: ''
    },
    {
      property: 'fb:app_id',
      content: ''
    },
    {
      name: 'twitter:site',
      content: ''
    },
    {
      name: 'twitter:creator',
      content: ''
    },
    {
      name: 'twitter:card',
      content: ''
    },
    {
      name: 'twitter:description',
      content: ''
    },
  ],
})

// Handle error on the client - page/post not found.
onErrorCaptured (error => {
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
