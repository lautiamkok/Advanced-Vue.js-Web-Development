<template>
  <button v-on:click.prevent="remove">
    Delete
  </button>
</template>

<script setup>
// Define props.
const props = defineProps({
  id: String
})

// Define emit events.
const emit = defineEmits(['delete-item'])

function remove () {
  // Emit the event.
  emit('delete-item', { id: props.id })

  // Delete the item directly here without emitting the event.
  // store.dispatch('deleteItem', { id: props.id })
}
</script>
