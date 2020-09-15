'use strict'

import Vue from 'vue'
import getters from './getters'

import Vuex from 'vuex'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    books: [
      { id: 1, name: 'The Haunting of Hill House', type: 'fiction' },
      { id: 2, name: 'The Selfish Gene', type: 'fact' },
      { id: 3, name: 'A Brief History of Time', type: 'fact' }
    ]
  },
  getters,
  strict: debug
})
