<template>
  <div>
    <p>{{ this.$store.state }}</p>

    <h2>Profile</h2>
    <ul>
      <li>Name: {{ profile.name }}</li>
      <li>Email: {{ profile.email }}</li>
      <li>Age: {{ profile.age }}</li>
    </ul>

    <h2>All Books</h2>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.title }}
      </li>
    </ul>

  </div>
</template>

<script>
// in full builds helpers are exposed as Vuex.mapState
import { mapState } from 'vuex'

export default {
  computed: mapState([
    // map this.books to store.state.books, etc
    'profile', 'books'
  ]),
}
</script>
