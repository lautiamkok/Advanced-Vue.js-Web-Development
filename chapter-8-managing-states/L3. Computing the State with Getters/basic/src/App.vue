<template>
  <div>
    <ul>
      <li><router-link to="/">Home</router-link></li>
    </ul>
    <router-view class="view"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>
