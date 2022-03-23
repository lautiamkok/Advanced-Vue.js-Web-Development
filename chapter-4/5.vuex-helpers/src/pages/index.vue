<template>
  <h1>{{ title }}</h1>
  <div v-html="contents"></div>
</template>

<script setup>
// https://vuejs.org/api/composition-api-lifecycle.html#composition-api-lifecycle-hooks
import { ref, onMounted } from 'vue'
import useFetch from '@/composables/use-fetch'
import { throwError } from '@/modules/utils'

const title = ref(null)
const contents = ref(null)

// Using `await` - must use with `<suspense>`.
// https://vuejs.org/api/sfc-script-setup.html
const { data } = await useFetch('/pages/pages__home__index')
if (data === null) {
  throwError('Sorry, we cannot find the requested page.', 404)
}

// Populate the properties.
title.value = data.title
contents.value = data.contents

onMounted(() => {
  console.log(`I'm mounted`)
})
</script>
