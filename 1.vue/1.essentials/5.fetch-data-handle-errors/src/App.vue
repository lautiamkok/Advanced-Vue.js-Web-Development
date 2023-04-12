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
const { error } = useError()

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
</script>
