<template>
  <site-header />
  <nav-main />
  <component :is="dynamicComponent" />
  <!-- or: -->
  <!-- <router-view v-slot="{ Component }">
    <Suspense>
      <component :is="errorStore.error ? ErrorComponent : Component" />
    </Suspense>
  </router-view> -->
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import { useErrorStore } from '@/stores/error'

// Switch between page and error components.
import PageComponent from '@/components/page.vue'
import ErrorComponent from '@/components/error.vue'
const dynamicComponent = computed(() => {
  if (errorStore.error) {
    return ErrorComponent
  }
  return PageComponent
})

// Populate cart content on the client side.
if (!import.meta.env.SSR) {
  const cartStore = useCartStore()
  const cartNamespace = import.meta.env.VITE_APP_CART_NS
  const { get, drop } = useCookie()
  const value = get(cartNamespace)
  // console.log('value =', value)
  // drop(cartNamespace)
  
  // If the cookie is gone, remove the data from the storage.
  if (!value) {
    localStorage.removeItem(cartNamespace)
  }

  const cartFromLocalStorage = localStorage.getItem(cartNamespace)
  cartStore.cart = JSON.parse(cartFromLocalStorage) ?? []
}

const route = useRoute()
const errorStore = useErrorStore()

// Populate error content on the client side.
if (!import.meta.env.SSR) {
  const errorNamespace = import.meta.env.VITE_APP_ERROR_NS
  const { get, drop } = useCookie()
  const value = get(errorNamespace)
  // console.log('value =', value)
  // drop(errorNamespace)
  
  // If the cookie is gone, remove the data from the storage.
  if (!value) {
    sessionStorage.removeItem(errorNamespace)
  }

  const data = sessionStorage.getItem(errorNamespace)
  const errorFromSessionStorage = JSON.parse(data) ?? false

  // Only populate if the current path and the error path are matched.
  if (errorFromSessionStorage.path === route.path) {
    errorStore.error = errorFromSessionStorage
  }
  // console.log('errorFromSessionStorage =', errorFromSessionStorage)
}

// Reset error when route changes.
watch(
  () => route.path,
  async (to, from) => {
    // Un-comment to see the log.
    // console.log('to =', to)
    // console.log('from =', from)

    // Reset the error data.
    if (errorStore.error) {
      errorStore.drop()
    }
  }
)

// Capture any uncaught and unhandled errors from the page level.
onErrorCaptured (err => {
  // Un-comment to see the log.
  // console.log('name =', err.name)
  // console.log('statusCode =', err.statusCode)
  // console.log('stack =', err.stack)
  // console.log('message =', err.message)

  // Add the path of the error page to the error oject
  err.path = route.path

  const normalizedError = normalizeError(err)
  if (!import.meta.env.SSR) {
    errorStore.add(normalizedError)
  }

  // Return false to prevent the error from propagating further.
  // https://vuejs.org/api/options-lifecycle.html#errorcaptured
  return false
})

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
</script>
