'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    profile: {
      name: 'John Doe',
      age: 20,
      email: 'johndoe@example.com'
    },
    books: [
      { id: 1, title: 'The Secret Garden', type: 'fiction' },
      { id: 2, title: 'The Selfish Gene', type: 'science' },
      { id: 3, title: 'Origin of species', type: 'science' },
    ]
  },
  strict: debug
})
