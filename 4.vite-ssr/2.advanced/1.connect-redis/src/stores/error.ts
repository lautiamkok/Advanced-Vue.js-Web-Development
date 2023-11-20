'use strict'

// https://pinia.vuejs.org/core-concepts/
import { defineStore } from 'pinia'

export const useErrorStore = defineStore('error', () => {
  // Create a session cookie - by not setting the max-age option.
  const namespace = import.meta.env.VITE_APP_ERROR_NS
  const { 
    set: setCookie, 
    get: getCookie, 
    drop: dropCookie
  } = useCookie()

  const error = ref(false) 
  
  async function add (err) {
    // Set new cookie key with a value for the cart when the cart is started empty
    // each time.
    if (error.value === false) {
      const timestamp = Date.now()
      setCookie(namespace, timestamp)
    }

    // Update cookie's expiration the cart is updated each time.
    if (error.value !== false) {
      const value = getCookie(namespace)
      setCookie(namespace, value)
    }

    error.value = err
    
    // Stringify the object before storing.
    const body = JSON.stringify(err)

    // Store the error object on the client side - sessionStorage.
    sessionStorage.setItem(namespace, body)
    
    // Store the error object on the server side - Redis.
    const baseURL = import.meta.env.VITE_API_REDIS_BASE_URL
    const { data } = await useF3tch(`/errors/set`, {
      baseURL,
      body,
      method: 'POST',

      // Add credentials and headers to allow cookie to be processed on the server
      // side for CORS.
      credentials: 'include',
      headers: {
        'Content-Type':'application/json',
        'Access-Control-Allow-Credentials': true
      }
    })
    // console.log('cart set =', data.value)
  }

  async function drop () {
    error.value = false

    // Remove the error object on the client side - sessionStorage.
    sessionStorage.removeItem(namespace)

    // Remove the error object on the server side - Redis.
    const baseURL = import.meta.env.VITE_API_REDIS_BASE_URL
    const { data } = await useF3tch(`/errors/del`, {
      baseURL,
      method: 'POST',

      // Add credentials and headers to allow cookie to be processed on the server
      // side for CORS.
      credentials: 'include',
      headers: {
        'Content-Type':'application/json',
        'Access-Control-Allow-Credentials': true
      }
    })
    
    // Delete the cookie.
    dropCookie(namespace)
  }

  return {
    error,
    add,
    drop
  }
})
