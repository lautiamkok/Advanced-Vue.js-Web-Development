<template>
  <div>
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
  name: 'default',

  beforeCreate () {
    document.body.className = ''
  }
}
</script>
