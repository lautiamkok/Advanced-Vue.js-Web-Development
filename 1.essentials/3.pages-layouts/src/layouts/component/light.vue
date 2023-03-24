<template>
  <div class="grey">
    <h3>
      {{ title }}
    </h3>
    <div v-html="contents" />
  </div>
</template>

<style scoped>
.grey {
  background-color: #ccc;
}
</style>

<script setup>
const title = ref()
const contents = ref()

const props = defineProps({
  data: {
    type: Object,
    default: {}
  }
})

title.value = props.data.title
contents.value = props.data.contents
</script>
