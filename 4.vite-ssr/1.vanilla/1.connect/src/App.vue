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
// `router.js`. This step is needed for the errors that are not caught with the
// try-catch block on the page level, such as the "Login (Error Demo 2)" page.
// It is because the error that caught in the app level will push the error
// data to the `error` reactive object globally. And the error data stays
// there "permanently" on the client side whenever the route changes and that
// will always call `ErrorComponent`, unless a non-error page is refreshed
// manually by the user (which is not ideal) to set the `error` reactive object
// to `false` again. So we need to reset the error automatically to `false`
// whenever the route is changed.
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
      
      // However, if you refresh the same page that has the error on the app
      // level, the error data is pushed to the `error` reactive object and it
      // is rendered on the server side. Then the client side will push the
      // error again to the same `error` reactive object and render the error
      // to hydrate the page. This will cause a hydration mismatch, because the
      // error data is always slightly different between the server and client.
      // This hydration mismatch can be resolved by making the client to use
      // the error data "printed" on the window object by the server. But this
      // will always `ErrorComponent` whenever the route changes subsequently
      // because the `error` reactive object is hydrating the data from the
      // window object. Furthermore, even if a non-error page is refreshed,
      // this is because the error is caught in the app level and pushed to the
      // `error` reactive object and that makes the error data
      // stays "permanently" on the server regardless what page you are
      // refreshing. This is just like the preceding "persisted" error data
      // that occurs on the client side when we create a global reactive
      // object. Hence, we need to send an extra HTTP request to the server
      // side behind the scene to clear the error automatically when the route
      // is changed. Therefore, the best practice is to catch the error on the
      // page level as possible as you can to avoid this extra step.
      await fetch(`${appBaseUrl}`, {
        method: 'POST',
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
