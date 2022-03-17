<template>
  <img alt="Vue logo" src="@/assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
  <comment>
    <p>I am a slot content</p>
  </comment>
  <button @click="count++">{{ count }}</button>

  <post-item
    v-bind:title="'Sample Post 1'"
    v-bind:excerpt="'Example on how to pass data to components.'"
    v-bind:date="useDate('2021-09-23T16:29:51.022Z')"
  />
</template>

<script setup>
import { ref } from 'vue'
import Comment from '@/components/comment.vue'
import PostItem from '@/components/post-item.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import useDate from '@/composables/use-date'

const count = ref(1)
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
