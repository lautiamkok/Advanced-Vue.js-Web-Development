<template>
  <dynamic-layout v-bind:data="data"/>
</template>

<script setup>
import useFetch from '@/composables/use-fetch'
import { throwError } from '@/modules/utils'
import DynamicLayout from '@/components/dynamic-layout.vue'

const { data } = await useFetch('/pages/pages__about__index')
if (data === null) {
  throwError('Sorry, we cannot find the requested page.', 404)
}
</script>
