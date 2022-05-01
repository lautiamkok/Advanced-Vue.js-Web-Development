'use strict'

import { createStore } from 'vuex'

import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

const debug = true

export default createStore({
  state,
  mutations,
  getters,
  actions,
  strict: debug
})
