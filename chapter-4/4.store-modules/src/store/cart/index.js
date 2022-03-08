'use strict'

import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
