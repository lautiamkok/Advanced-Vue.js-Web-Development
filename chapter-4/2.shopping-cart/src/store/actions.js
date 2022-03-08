'use strict'

import _ from 'lodash'

export default {
  populate ({ state, commit }, items) {
    commit('setItems', items)
  },

  empty ({ state, commit }) {
    commit('setItems', [])
  },

  update ({ state, commit }, items) {
    // Remove items where quantity is 0.
    // https://lodash.com/docs/4.17.15#remove
    _.remove(items, item => Number(item.quantity) === 0)

    // Reset before update.
    commit('setItems', [])
    commit('setItems', items)
  },

  addItem ({ state, commit }, item) {
    // Don't push the item if it exists already, update the item's quantity instead.
    // Find the match using meta because the quantity can change.
    // https://lodash.com/docs/4.17.15#some
    const exist = _.some(state.items, { id: item.id })
    if (exist === true) {
      commit('updateItem', item)
      return
    }

    commit('setItem', item)
  },

  updateItem ({ state, commit }, item) {
    commit('updateItem', item)
  },

  deleteItem ({ state, commit }, item) {
    commit('unsetItem', item)
  }
}
