<template>
  <h1>{{ title }}</h1>
  <p>Total Items: {{ sumItems }} </p>
  <p>Total Unique Items: {{ uniqueItems }}</p>
  <p>Total Cost: {{ sumCosts }}</p>

  <li
    v-for="item in cartItems"
    v-bind:key="item.id"
    v-if="cartItems.length > 0"
  >
    <cart-item
      v-bind:product=item
    />
  </li>

  <cart-actions
     v-if="cartItems.length > 0"
  />
</template>

<script setup>
const title = 'Cart'

// The current official way in accessing state, getters, mutations, and actions.
// The Vuex map helpers aren't supported (yet?) in the Vue 2 or Vue 3
// composition API, you'll have to manually create a computed like in the
// docs:
// https://next.vuex.vuejs.org/guide/composition-api.html
// const store = useStore()
// const items = computed(() => store.getters['cart/getItems'])
// const sumItems = computed(() => store.getters['cart/sumItems'])
// const uniqueItems = computed(() => store.getters['cart/uniqueItems'])
// const sumCosts = computed(() => store.getters['cart/sumCosts'])
</script>

<script>
// https://next.vuex.vuejs.org/guide/getters.html#the-mapgetters-helper
import { mapState, mapGetters } from 'vuex'

// Mix with Options APIs for using Vuex map helpers.
export default {
  computed: {
    ...mapState([
      // map this.count to store.state.layout
      'layout'
    ]),

    // mix this into the outer object with the object spread operator
    ...mapState('cart', {
      cartItems: 'items',
      // Same as:
      // cartItems (state) {
      //   return state.items
      // }
    }),

    // Same as:
    // ...mapGetters('cart', {
    //   cartItems: 'getItems'
    // }),

    // mix the getters into computed with object spread operator.
    ...mapGetters('cart', [
      'sumItems',
      'uniqueItems',
      'sumCosts'
    ])
  }
}
</script>
