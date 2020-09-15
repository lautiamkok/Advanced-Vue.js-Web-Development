<template>
  <div>
    <p>{{ this.$store.state }}</p>
    <p>{{ reversedMessage }}</p>
    <p>{{ totalFiction }}</p>
    <p>{{ getBook }}</p>

  </div>
</template>

<script>
export default {
  name: 'home',
  // data: function () {
  //   return {
  //     message: 'Hello'
  //   }
  // },

  data: () => ({
    message: 'Hello World'
  }),

  computed: {
    // a computed getter
    reversedMessage: function () {
      // `this` points to the vm instance
      return this.message.split('').reverse().join('')
    },

    totalFiction () {
      return this.$store.getters.countFiction
    },

    getBook () {
      return this.$store.getters.getBookById(2)
    }
  }
}
</script>
