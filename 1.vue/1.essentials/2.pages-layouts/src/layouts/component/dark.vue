<template>
  <div class="dark">
    <h3>
      {{ title }}
    </h3>
    <div v-html="contents" />
  </div>
</template>

<style>
.dark {
  background-color: #666;
}

.dark p {
  color: #fff;
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
