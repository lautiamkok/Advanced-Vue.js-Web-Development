<template>
  <h1>{{ title }}</h1>
  <div v-html="contents"></div>
  {{ items }}
</template>

<script setup>
import { ref } from 'vue'
import useFetch from '@/composables/use-fetch'
import { throwError, isEmpty } from '@/modules/utils'
import useItems from '@/composables/use-items'

const title = ref(null)
const contents = ref(null)

const { data } = await useFetch('/pages/pages__about__index')
if (data === null) {
  throwError('Sorry, we cannot find the requested page.', 404)
}

// Update the items state.
const { items } = useItems()
items.value = ['hello']

title.value = data.title
contents.value = data.contents
</script>
