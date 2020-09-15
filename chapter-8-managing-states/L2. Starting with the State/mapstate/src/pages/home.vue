<template>
  <div>
    <p>{{ this.$store.state }}</p>

    <h2>Profile</h2>
    <ul>
      <li>Name: {{ profile.name }}</li>
      <li>Email: {{ profile.email }}</li>
      <li>Age: {{ profile.age }}</li>
    </ul>

    <h2>All Books ({{ totalBooks }})</h2>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.title }}
      </li>
    </ul>

    <h2>All Books (Alias)</h2>
    <ul>
      <li v-for="book in booksAlias" :key="book.id">
        {{ book.title }}
      </li>
    </ul>

    <h2>All Fictions ({{ totalFictions }})</h2>
    <ul>
      <li v-for="book in fictions" :key="book.id">
        {{ book.title }}
      </li>
    </ul>

  </div>
</template>

<script>
// in full builds helpers are exposed as Vuex.mapState
import { mapState } from 'vuex'

export default {
  data () {
    return {
      localFictions: [
        { id: 4, title: 'Jane Eyre', type: 'fiction' }
      ]
    }
  },

  computed: {
    // mix this into the outer object with the object spread operator
    ...mapState([
      // map this.books to store.state.books, etc
      'profile', 'books'
    ]),

    ...mapState({
      // arrow functions can make the code very succinct!
      // experience: state => state.experience,

      // to access local state with `this`, a normal function must be used
      fictions (state) {
        const fictions = state.books.filter(book => book.type === 'fiction')
        return [...fictions, ...this.localFictions]
      }
    }),

    ...mapState({
      // passing the string value 'books' is same as `state => state.books`
      booksAlias: 'books',
    }),

    // books () {
    //   return this.$store.state.books
    // },

    // fictions () {
    //   return this.books.filter(book => book.type === 'fiction')
    // },

    totalBooks () {
      return this.books.length
    },

    totalFictions () {
      return this.fictions.length
    }
  }
}
</script>
