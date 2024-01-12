<template>
  <dynamic-layout v-bind:data="data"/>
  <comment v-if="error === false">
    <p>I am a slot content</p>
  </comment>
  <button @click="count++">{{ count }}</button>
</template>

<script setup>
import useFetch from '@/composables/use-fetch'
import { throwError } from '@/modules/utils'

const count = ref(1)
const { data, error, message, status } = await useFetch(`/wp-json/api/v1/page/about`)
if (error) {
  throwError(JSON.stringify(message), status)
}
data.layout = 'light'
</script>
