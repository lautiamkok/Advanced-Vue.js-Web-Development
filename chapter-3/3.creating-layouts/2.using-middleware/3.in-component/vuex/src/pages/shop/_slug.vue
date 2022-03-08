<template>
  <h1>{{ title }}</h1>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router'
import { useStore } from 'vuex'
import useFetch from '@/composables/use-fetch'
import { throwError } from '@/modules/utils'

const store = useStore()
const route = useRoute()
const title = ref(null)
const contents = ref(null)

// Throw a 400 error if the param is invalid.
let test = /^[a-zA-Z0-9\-]*$/.test(route.params.slug)
if (test === false) {
  throwError('Invalid request', 400)
}

const unwatch = watch(
  () => route.params.slug,
  async slug => {
    // Fetch the data.
    const { data } = await useFetch(`/products/products__${slug}__index`)

    // Throw 404 if we get 404 from the API.
    if (data === null) {
      throwError('Sorry, we cannot find the requested page.', 404)
    }

    // Update the store state.
    // store.commit('setLayout', data.layout)
    store.dispatch('asyncLayout', data.layout)

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
// now the watcher is watching and you can disable it
// by calling unwatch() somewhere else;
// you can store the unwatch function to a variable in the data
// or whatever suits you best
// https://v3.vuejs.org/api/instance-methods.html#watch

// Destroy the watcher before leaving.
// https://next.router.vuejs.org/guide/advanced/composition-api.html#navigation-guards
onBeforeRouteLeave((to, from) => {
  unwatch()
})

// same as beforeRouteUpdate option with no access to `this`
onBeforeRouteUpdate((to, from) => {
  to.meta.layout = true
})
</script>
