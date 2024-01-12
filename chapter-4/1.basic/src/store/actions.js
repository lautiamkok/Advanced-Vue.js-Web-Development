'use strict'

export default {
  async fetchUser ({ state, commit }, id) {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/' + id) // wait for `fetch` to finish
    const user = await response.json()
    commit('setUser', user)
  }
}
