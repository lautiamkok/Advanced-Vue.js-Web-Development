<template>
  <p>
    Data from the parent: {{ parent }}
  </p>
  <button v-on:click.prevent="emitUp">
    Emit
  </button>
</template>

<script setup>
// Define props.
const props = defineProps({
  parent: {
    type: String
  }
})

// Define emit events.
const emit = defineEmits(['emit-data'])

function emitUp () {
  // Emit the event.
  emit('emit-data', 'Emitting up the data')
}
</script>
