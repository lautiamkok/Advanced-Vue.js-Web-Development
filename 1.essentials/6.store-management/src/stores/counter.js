'use strict'

// https://pinia.vuejs.org/core-concepts/
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  // Persist the state between the server and client sides through cookies. Only
  // cookies are SSR-friendly. Others like localstorage only work on the
  // client (browser). If you intend to use a browser storage, make sure it
  // runs on the client side only.
  const days = 1
  const count = useCookie('count', {
    maxAge: days * 24 * 60 * 60
    // Or:
    // days
  })
  count.value = count.value || 0

  const doubleCount = computed(() => count.value * 2)

  function increment () {
    count.value++
  }

  function decrement () {
    count.value--
  }

  function reset () {
    count.value = 0
  }

  return { 
    count, 
    doubleCount, 
    increment, 
    decrement, 
    reset
  }
})
