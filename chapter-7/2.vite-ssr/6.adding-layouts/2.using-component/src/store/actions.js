'use strict'

export default {
  async asyncLayout ({ state, commit, rootState }, data) {
    commit('setLayout', data)
  }
}
