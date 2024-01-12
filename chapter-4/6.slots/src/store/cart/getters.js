'use strict'

// Getters are computed properties for stores.
// You can get the getter property data as follows in your template:
// {{ this.$store.getters.something }}
// https://next.vuex.vuejs.org/guide/getters.html

import _ from 'lodash'

export default {
  getItems (state) {
    return state.items
  },

  sumItems (state) {
    // Sum the items.
    // Make the string to number with sumBy.
    // https://lodash.com/docs/4.17.15#sumBy
    return _.sumBy(state.items, item => Number(item.quantity))
  },

  uniqueItems (state) {
    return state.items.length
  },

  sumCosts (state) {
    // Sum the costs.
    // Make the string to number with sumBy.
    // https://lodash.com/docs/4.17.15#sumBy
    const cost = _.sumBy(state.items, item => Number(item.cost))
    return cost.toFixed(2)
  },
}
