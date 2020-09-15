'use strict'

const getters = {
  getFiction: state => {
    return state.books.filter(book => book.type === 'fiction')
  },

  countFiction: (state, getters) => {
    return getters.getFiction.length
  },

  getBookById: (state) => (id) => {
    return state.books.find(book => book.id === id)
  }
}

export default getters
