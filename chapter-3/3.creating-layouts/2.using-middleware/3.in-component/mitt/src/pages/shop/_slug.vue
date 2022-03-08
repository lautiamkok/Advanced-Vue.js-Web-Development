<template>
  <h1>{{ title }}</h1>
  <div v-html="contents"></div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router'
import useFetch from '@/composables/use-fetch'
import { throwError } from '@/modules/utils'
import emitter from '@/modules/emitter'

const route = useRoute()
const title = ref(null)
const contents = ref(null)

// Throw a 400 error if the param is invalid.
let test = /^[a-zA-Z0-9\-]*$/.test(route.params.slug)
if (test === false) {
  throwError('Invalid request', 400)
}

// Vue caches rendered component:
// One thing to note when using routes with params is that when the user
// navigates from /users/johnny to /users/jolyne, the same component instance
// will be reused. Since both routes render the same component, this is more
// efficient than destroying the old instance and then creating a new one.
// However, this also means that the lifecycle hooks of the component will not
// be called. So, to react to params changes in the same component, you can
// simply watch anything on the $route object, in this scenario, the
// $route.params. Or add :key="$route.path" to the parent component (App.vue):
// <router-view :key="route.path"/>
// https://next.router.vuejs.org/guide/essentials/dynamic-matching.html#reacting-to-params-changes
// console.log('route.params.slug =', route.params.slug)

// const { data } = await useFetch(`/products/products__${route.params.slug}__index`)
// if (data === null) {
//   throwError('Sorry, we cannot find the requested page.', 404)
// }

// // Populate the properties.
// title.value = data.title
// contents.value = data.contents

const unwatch = watch(
  () => route.params.slug,
  async slug => {
    // Fetch the data.
    const { data } = await useFetch(`/products/products__${slug}__index`)

    // Throw 404 if we get 404 from the API.
    if (data === null) {
      throwError('Sorry, we cannot find the requested page.', 404)
    }

    // Emit a `set-layout` event.
    emitter.emit('set-layout', data.layout)

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

<!-- <script>
// https://stackoverflow.com/a/66482308/413225
export default {
  // Only triggered once just like the `beforeEnter` per-Route guard. So going
  // from `/shop/product-1` to `/shop/product-2` won't trigger this guard
  // again.
  async beforeRouteEnter(to, from) {
    // Set layout to the meta.
    to.meta.layout = true

    // called before the route that renders this component is confirmed.
    // does NOT have access to `this` component instance,
    // because it has not been created yet when this guard is called!
  },
}
</script> -->
