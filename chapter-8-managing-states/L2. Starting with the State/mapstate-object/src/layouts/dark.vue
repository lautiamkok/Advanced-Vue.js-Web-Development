<template>
  <div class="dark">
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
      </ul>
    </nav>
    <main>
      <slot/>
    </main>
    <footer>
      &copy; Awesome Company
    </footer>
  </div>
</template>

<script>
export default {
  name: 'dark',

  beforeCreate () {
    document.body.className = 'dark'
  }
}
</script>

<style scoped>
.dark {
  height: 100vh;
  background-color: red;
  color: #fff;
}

.dark a {
  color: #fff;
}
</style>

