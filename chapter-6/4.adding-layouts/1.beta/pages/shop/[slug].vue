<template>
  <div>
    <NuxtLayout :name="layout">
      <h1>{{ title }}</h1>
      <div v-html="contents"></div>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router'
import useFetch from '@/composables/use-fetch'

const route = useRoute()
const layout = ref(null)
const title = ref(null)
const contents = ref(null)

// Store the watch function to a variable so that you can destroy it somewhere.
// https://v3.vuejs.org/api/instance-methods.html#watch
const unwatch = watch(
  () => route.params.slug,
  async slug => {
    // Fetch the data.
    const { data } = await useFetch(`/products/products__${slug}__index`)

    // Populate the data.
    layout.value = data.layout
    title.value = data.title
    contents.value = data.contents
  },

  // Optionally you can set immediate: true config for the watcher to run on
  // init. Otherwise `slug` only reactive when going from 1 to 2 after entering
  // this route. https://v3.vuejs.org/api/instance-methods.html#watch
  {
    immediate: true,
  }
)

// Destroy the watcher before leaving the `/shop/:slug` route.
onBeforeRouteLeave((to, from) => {
  unwatch()
})

// same as beforeRouteUpdate option with no access to `this`
onBeforeRouteUpdate((to, from) => {
  to.meta.layout = true
})
</script>
