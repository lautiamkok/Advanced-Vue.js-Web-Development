import Vue from 'vue'
import App from './App.vue'

import Default from './layouts/default.vue'
import Dark from './layouts/dark.vue'

import router from './router'

import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    increment (state) {
      state.counter++
    }
  }
})

store.commit('increment')
console.log(store.state.counter)

Vue.component('layout-default', Default)
Vue.component('layout-dark', Dark)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
