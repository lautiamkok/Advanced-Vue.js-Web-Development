'use strict'

// https://pinia.vuejs.org/core-concepts/
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const days = 1
  const options = {
    maxAge: days * 24 * 60 * 60
    // Or:
    // days
  }
  const { get, observe } = useCookie(options)
  const value = get('count')
  const count = ref(JSON.parse(value) || 0)
  observe(count, 'count')

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
