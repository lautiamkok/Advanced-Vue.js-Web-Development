<template>
  <div>
    <p>
      default
    </p>
    <h3>
      {{ title }}
    </h3>
    <div v-html="contents" />
  </div>
</template>

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
