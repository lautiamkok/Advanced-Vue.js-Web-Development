'use strict'

import { createStore } from 'vuex'

import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

const debug = import.meta.env.MODE !== 'production'

export default createStore({
  state,
  mutations,
  getters,
  actions,
  strict: debug
})
