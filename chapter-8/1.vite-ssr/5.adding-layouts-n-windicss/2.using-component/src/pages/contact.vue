<template>
  <dynamic-layout v-bind:data="data"/>
</template>

<script setup>
import useFetch from '@/composables/use-fetch'
import { throwError } from '@/modules/utils'

const { data } = await useFetch(`/wp-json/api/v1/page/contact`)
if (data === null) {
  throwError('Sorry, we cannot find the requested page.', 404)
}
data.layout = 'dark'
</script>

