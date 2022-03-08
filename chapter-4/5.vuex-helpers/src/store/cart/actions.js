'use strict'

// Local database.
// https://www.npmjs.com/package/localforage
import localforage from 'localforage'

import _ from 'lodash'

export default {
  populate ({ state, commit, rootState }, items) {
    commit('setItems', items)
  },

  async empty ({ state, commit, rootState }) {
    commit('setItems', [])

    // Reset the items in the localstorage.
    await localforage.setItem('cart', [])
  },

  async update ({ state, commit, rootState }, items) {
    // Remove items where quantity is 0.
    // https://lodash.com/docs/4.17.15#remove
    _.remove(items, item => Number(item.quantity) === 0)

    // Reset before update.
    commit('setItems', [])
    commit('setItems', items)

    // Reset the items in the localstorage.
    await localforage.setItem('cart',  _.cloneDeep(items))
  },

  async addItem ({ state, commit, rootState }, item) {
    // const cart = await localforage.getItem('cart')

    // Don't push the item if it exists already, update the item's quantity instead.
    // Find the match using meta because the quantity can change.
    // https://lodash.com/docs/4.17.15#some
    const exist = _.some(state.items, { id: item.id })
    if (exist === true) {
      commit('updateItem', item)
      return
    }
    commit('setItem', item)

    // Clone the Vue object and make it non reactive before saving to localforage.
    // https://lodash.com/docs/4.17.15#cloneDeep
    await localforage.setItem('cart', _.cloneDeep(state.items))
  },

  async updateItem ({ state, commit, rootState }, item) {
    commit('updateItem', item)

    // Clone the Vue object and make it non reactive before resetting the cart
    // in localforage.
    await localforage.setItem('cart', _.cloneDeep(state.items))
  },

  async deleteItem ({ state, commit, rootState }, item) {
    commit('unsetItem', item)

    // Reset the items in the localstorage.
    await localforage.setItem('cart',  _.cloneDeep(state.items))
  }
}
