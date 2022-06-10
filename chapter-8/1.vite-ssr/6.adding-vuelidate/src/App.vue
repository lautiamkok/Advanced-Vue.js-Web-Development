<template>
  <nav v-if="menu">

    <!-- does not work on SSR -->
    <!-- <router-link
      :to="item.path"
      v-for="(item, index) in menu"
      v-html="item.title"
    /> -->

    <!-- works ok on SSR -->
    <!-- <router-link
      :to="item.path"
      v-for="(item, index) in menu"
    >
      {{ item.title }}
    </router-link> -->

    <!-- works ok on SSR -->
    <router-link
      :to="item.path"
      v-for="(item, index) in menu"
    >
      <span v-html="item.title"/>
    </router-link>

  </nav>
  <!-- <router-view v-slot="{ Component }">
    <Suspense>
      <component :is="Component" />
    </Suspense>
  </router-view> -->
  <suspense>
    <router-view/>
  </suspense>
</template>

<script setup>
const menu = [
  {
    title: 'Home',
    path: '/'
  },
  {
    title: 'Contact',
    path: '/contact'
  }
]
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

a {
  margin: 1.1em;
}
</style>
