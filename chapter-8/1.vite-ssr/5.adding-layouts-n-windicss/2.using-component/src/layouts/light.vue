<template>
  <div class="grey">
    <h1>{{ title }}</h1>
    <div v-html="contents"></div>
  </div>
</template>

<style scoped>
.grey {
  background-color: #ccc;
}
</style>

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
