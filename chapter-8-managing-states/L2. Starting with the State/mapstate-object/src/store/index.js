'use strict'

import Vue from 'vue'
import getters from './getters'

import Vuex from 'vuex'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    books: [
      { id: 1, title: 'The Secret Garden', type: 'fiction' },
      { id: 2, title: 'The Selfish Gene', type: 'science' },
      { id: 3, title: 'Origin of species', type: 'science' },
    ]
  },
  getters,
  strict: debug
})
