<template>
  <div>
    <p>{{ this.$store.state }}</p>
    <p>{{ this.$store.state.books[0] }}</p>

    <h2>All Books ({{ totalBooks }})</h2>
    <ul>
      <li v-for="book in books" :key="book.id">
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
export default {
  data () {
    return {
      books: this.$store.state.books
    }
  },

  computed: {
    // books () {
    //   return this.$store.state.books
    // },

    fictions () {
      return this.books.filter(book => book.type === 'fiction')
    },

    totalBooks () {
      return this.books.length
    },

    totalFictions () {
      return this.fictions.length
    }
  }
}
</script>
