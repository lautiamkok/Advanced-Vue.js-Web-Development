<template>
  <dynamic-layout v-bind:data="data"/>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

import useFetch from '@/composables/use-fetch'
import { throwError } from '@/modules/utils'

import DynamicLayout from '@/components/dynamic-layout.vue'

const route = useRoute()
let test = /^[a-zA-Z0-9\-]*$/.test(route.params.slug)
if (test === false) {
  throwError('Invalid request', 400)
}

const { data } = await useFetch(`/posts/posts__${route.params.slug}__index`)
if (data === null) {
  throwError('Sorry, we cannot find the requested page.', 404)
}
</script>
