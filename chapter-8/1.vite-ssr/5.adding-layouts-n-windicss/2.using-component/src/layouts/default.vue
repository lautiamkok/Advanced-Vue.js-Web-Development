<template>
  <p>default</p>
  <h1>{{ title }}</h1>
  <div v-html="contents"></div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref(null)
const contents = ref(null)

const props = defineProps({
  data: {
    type: Object,
    default: {}
  }
})

title.value = props.data.title
contents.value = props.data.contents
</script>
