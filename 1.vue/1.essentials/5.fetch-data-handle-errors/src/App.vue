<template>
  <site-header/>
  <nav-main/>
  <router-view v-slot="{ Component }">
    <Suspense>
      <error-boundary v-bind:error="error">
        <component :is="Component" />
      </error-boundary>
    </Suspense>
  </router-view>
</template>

<script setup>
const error = ref(false)
const route = useRoute()

watch(
  () => route.path,
  async (to, from) => {
    // Un-comment to see the log.
    // console.log('to =', to)
    // console.log('from =', from)

    if (error.value) {
      // Reset the raw error data.
      error.value = false
    }
  }
)

onErrorCaptured (err => {
  // console.log('name =', err.name)
  // console.log('message =', err.message)
  // console.log('statusCode =', err.statusCode)
  // console.log('stack =', err.stack)

  error.value = normalizeError(err)

  // Return false to prevent the error from propagating further.
  // https://vuejs.org/api/options-lifecycle.html#errorcaptured
  return false
})
</script>
