import Vue from 'vue'
import App from './App.vue'

import Default from './layouts/default.vue'
import Dark from './layouts/dark.vue'

import router from './router'
import store from './store'

Vue.component('layout-default', Default)
Vue.component('layout-dark', Dark)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
