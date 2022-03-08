'use strict'

import { createStore } from 'vuex'

import state from './state'
import cart from './cart'

const debug = import.meta.env.MODE !== 'production'

export default createStore({
  state,
  modules: {
    cart
  },
  strict: debug
})
