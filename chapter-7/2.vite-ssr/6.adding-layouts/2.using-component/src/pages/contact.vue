<template>
  <dynamic-layout v-bind:data="data"/>
</template>

<script setup>
import { ref } from 'vue'

import useFetch from '@/composables/use-fetch'
import { throwError } from '@/modules/utils'

import DynamicLayout from '@/components/dynamic-layout.vue'

const title = ref(null)
const contents = ref(null)
const { data } = await useFetch(`/wp-json/api/v1/page/contact`)
if (data === null) {
  throwError('Sorry, we cannot find the requested page.', 404)
}
data.layout = 'dark'

title.value = data.title
contents.value = data.contents
</script>

