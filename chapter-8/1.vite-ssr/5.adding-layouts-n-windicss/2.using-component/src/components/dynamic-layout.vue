<template>
  <component
    v-bind:is="layouts[layout]"
    v-bind:data="data"
  />
</template>

<script setup>
import { ref } from 'vue'

// Import layouts.
import Default from '@/layouts/default.vue'
import Dark from '@/layouts/dark.vue'
import Light from '@/layouts/light.vue'

const layout = ref('default')

// Create a lookup object to reference the components.
const layouts = {
  default: Default,
  light: Light,
  dark: Dark
}

const props = defineProps({
  data: {
    type: Object,
    default: {}
  }
})
if (props.data.layout) {
  layout.value = props.data.layout
}
</script>
