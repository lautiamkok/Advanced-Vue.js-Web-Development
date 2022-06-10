<template>
  <h1>{{ title }}</h1>
  {{ user }}
</template>

<script setup>
// No need to import methods from vue and vuex manually anymore for using
// unplugin-auto-import 

// import { computed } from 'vue' 
// import { useStore } from 'vuex'

const store = useStore()
const title = 'Home'

const user = computed(() => store.getters['getUser'])
store.dispatch('fetchUser', 1)
</script>
