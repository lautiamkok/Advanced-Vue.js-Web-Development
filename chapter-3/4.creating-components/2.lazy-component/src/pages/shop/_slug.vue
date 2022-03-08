<template>
  <h1>{{ title }}</h1>
  <div v-html="contents"></div>
  <li
    v-for="item in gallery"
    v-bind:key="item.id"
    v-if="gallery !== null && gallery !== undefined"
  >
    <a href="#" v-on:click.prevent="toggleModal">
      <img
        :alt="item.sizes.small.alt"
        :src="getAsset(
          item.sizes.small.src,
          relativePath
        )"
      />
    </a>
  </li>

  <Suspense v-if="modal === true">
    <template #default>
      <lazy-gallery
        v-bind:gallery="gallery"
        v-bind:relative-path="relativePath"
        v-bind:modal="modal"
        v-on:hide-modal="toggleModal"
      />
    </template>
    <template #fallback>
      <div class="
        fixed
        top-0
        bottom-0
        left-0
        right-0
        bg-gray-50
        z-1
        flex-center-xy
      ">
        Loading...
      </div>
    </template>
  </Suspense>

</template>

<script setup>
import { ref, watch, defineAsyncComponent } from 'vue'
import { useRoute, onBeforeRouteLeave } from 'vue-router'
import useFetch from '@/composables/use-fetch'
import { throwError, getAsset } from '@/modules/utils'

const route = useRoute()
const title = ref(null)
const contents = ref(null)
const gallery = ref(null)
const relativePath = ref(null)
const modal = ref(false)

// Define the lazy-load component.
const lazyGallery = defineAsyncComponent(() =>
  import('@/components/lazy/gallery.vue')
)

// Throw a 400 error if the param is invalid.
let test = /^[a-zA-Z0-9\-]*$/.test(route.params.slug)
if (test === false) {
  throwError('Invalid request', 400)
}

// Store the watch function to a variable so that you can destroy it somewhere.
// https://v3.vuejs.org/api/instance-methods.html#watch
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
    gallery.value = data.gallery
    relativePath.value = data.meta.relativePath
  },

  // Optionally you can set immediate: true config for the watcher to run on
  // init. Otherwise `slug` only reactive when going from 1 to 2 after entering
  // this route. https://v3.vuejs.org/api/instance-methods.html#watch
  {
    immediate: true,
  }
)

// Toggle the value.
function toggleModal () {
  modal.value = !modal.value
}

// Destroy the watcher before leaving the `/shop/:slug` route.
onBeforeRouteLeave((to, from) => {
  unwatch()
})
</script>
