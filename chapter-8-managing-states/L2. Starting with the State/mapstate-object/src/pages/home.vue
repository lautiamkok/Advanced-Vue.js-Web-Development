<template>
  <div>
    <p>{{ this.$store.state }}</p>

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

  computed: mapState({
    // arrow functions can make the code very succinct!
    books: state => state.books,

    // passing the string value 'books' is same as `state => state.books`
    booksAlias: 'books',

    // to access local state with `this`, a normal function must be used
    fictions (state) {
      const fictions = state.books.filter(book => book.type === 'fiction')
      return [...fictions, ...this.localFictions]
    },

    totalBooks () {
      return this.books.length
    },

    totalFictions () {
      return this.fictions.length
    },
  }),
}
</script>
