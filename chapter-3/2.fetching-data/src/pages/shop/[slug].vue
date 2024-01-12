<template>
  <div>
    <h1>{{ title }}</h1>
    <div v-html="contents"></div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, onBeforeRouteLeave } from 'vue-router'
import useFetch from '@/composables/use-fetch'
import { throwError } from '@/modules/utils'

const route = useRoute()
const title = ref(null)
const contents = ref(null)

// Throw a 400 error if the param is invalid.
let test = /^[a-zA-Z0-9\-]*$/.test(route.params.slug)
if (test === false) {
  throwError('Invalid request', 400)
}

// Store the watch function to a variable so that you can destroy it somewhere.
// https://vuejs.org/api/component-instance.html#watch
const unwatch = watch(
  () => route.params.slug,
  async slug => {
    // Fetch the data.
    const { data } = await useFetch(`/products/products__${slug}__index`)

    // Throw 404 if we get 404 from the API.
    if (data === null) {
      throwError('Sorry, we cannot find the requested product.', 404)
    }

    // Populate the data.
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
</script>
