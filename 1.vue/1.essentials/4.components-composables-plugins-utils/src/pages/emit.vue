<template>
  <h2>
    Passing Data with `defineProps` and `defineEmits`
  </h2>
  <post-item 
    v-bind:parent="parent"
    v-on:emit-data="recieve"
  />
  <p>
    Data from the child: {{ child }}
  </p>
</template>

<script setup>
const child = ref(null)
const parent = 'Passing down the data...'

// Handle emitted value from the event.
function recieve (value) {
  child.value = value
}
</script>
