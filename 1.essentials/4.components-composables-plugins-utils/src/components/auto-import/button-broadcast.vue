<template>
  <button v-on:click.prevent="broadcast">
    Broadcast
  </button>
</template>

<script setup>
const state = useState()
function broadcast () {
  state.value = 'Broadcasting the data'
}
</script>
