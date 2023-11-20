'use strict'

// https://pinia.vuejs.org/core-concepts/
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const namespace = import.meta.env.VITE_APP_CART_NS
  const cartFromLocalStorage = localStorage.getItem(namespace)
  const cart = ref(JSON.parse(cartFromLocalStorage) || [])
  const response = reactive({
    message: '',
    data: ''
  })
  const getItems = computed(() => cart.value)
  const uniqueLength = computed(() => cart.value.length)
  const sumQuantity = computed(() => {
    // Sum the cart by the `quantity` key.
    return cart.value.reduce((accumulator, object) => 
      Number(object.quantity) + accumulator, 0
    )
  })
  const sumCost = computed(() => {
    // Sum the cost by the `cost` key.
    const costs = cart.value.reduce((accumulator, object) => 
      Number(object.cost) + accumulator, 0
    )
    return costs.toFixed(2)
  })

  // Promisise setTimeout.
  // Usage:
  // await delay(500)
  async function delay (ms) {
    return new Promise(res => {
      setTimeout(res, ms)
    })
  }

  async function addItem (item) {
    // Don't push the item if it exists already, update the item's quantity
    // instead. Find the match using id because the quantity can change.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
    const exist = cart.value.some(product => product.id === item.id)
    if (exist === true) {
      await updateItem(item)
      return
    }
    cart.value.push(item)

    // Store cart to `localstorage`.
    storeCart(cart)

    response.message = 'Added ok'
    response.data = item
    await delay(3000)
    response.message = ''
    response.data = ''
  }

  async function updateItem (item) {
    // Find the index of the current element.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
    const index = cart.value.findIndex((element, index) => {
      if (element.id === item.id) {
        return true
      }
    })

    cart.value[index].quantity = item.quantity
    cart.value[index].cost = item.cost

    // Store cart to `localstorage`.
    storeCart(cart)

    response.message = 'Updated ok'
    response.data = item
    await delay(3000)
    response.message = ''
    response.data = ''
  }

  function deleteItem (item) {
    // Find the index of the current element.
    const index = cart.value.findIndex((element, index) => {
      if (element.id === item.id) {
        return true
      }
    })

    // Delete the item from store.
    cart.value.splice(index, 1)

    // Store cart to `localstorage`.
    storeCart(cart)
  }

  function empty () {
    cart.value = []

    // Store cart to `localstorage`.
    storeCart(cart)
  }

  function storeCart (cart) { 
    const body = JSON.stringify(unref(cart))

    localStorage.setItem(id, body)
    if (unref(cart).length === 0) {
      localStorage.removeItem(id)
    }
  }

  return {
    response,
    cart,
    getItems,
    uniqueLength,
    sumQuantity,
    sumCost,
    addItem,
    updateItem,
    deleteItem,
    empty
  }
})
