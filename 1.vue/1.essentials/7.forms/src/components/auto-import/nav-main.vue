<template>
  <ul v-if="menu">
    <li v-for="(item, index) in menu">
      <router-link  :to="item.path">
        {{ item.title }}
      </router-link >
    </li>
  </ul>
</template>

<script setup>
const menu = [
  {
    title: 'Home',
    path: '/'
  },
  {
    title: 'Custom Inputs',
    path: '/inputs'
  },
  {
    title: 'Validate',
    path: '/validate'
  },
  {
    title: 'Vuelidate',
    path: '/vuelidate'
  }
]
</script>
