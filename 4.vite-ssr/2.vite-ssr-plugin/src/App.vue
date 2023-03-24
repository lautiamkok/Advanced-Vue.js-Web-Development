<template>
  <site-header/>
  <nav-main/>
  <router-view v-slot="{ Component }">
    <Suspense>
      <error-boundary>
        <component :is="Component" />
      </error-boundary>
    </Suspense>
  </router-view>
</template>

<script setup>
const route = useRoute()
const { raw, error, skip } = useError()
const appBaseUrl = import.meta.env.VITE_APP_BASE_URL

// Reset error when route changes. Or, use the afterEach global guard in
// `router.js`.
watch(
  () => route.path,
  async (to, from) => {
    // Un-comment to see the log.
    // console.log('to =', to)
    // console.log('from =', from)

    if (error.value) {
      // Reset the raw error data.
      raw.value = false

      // Skip reading the error data from the window object.
      skip.value = true

      // Send an HTTP request to clear the error on the server side. Vite SSR
      // plugin only allows GET method. So use GET only to send requests.
      await fetch(`${appBaseUrl}/log`, {
        method: 'GET',
        headers: {
          'x-clear-error': 'true'
        },
      })
    }
  }
)

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
