'use strict'

// import { createClient } from 'redis'

// https://redis.io/docs/clients/nodejs/
export default async (req, res) => {
  const cartId = import.meta.env.VITE_APP_CART_ID
  const { get } = useCookie()

  // Get the value of the cart from cookie and use it to set a key in Redis
  // db, e.g. `example.com:cart:1683665729834`.
  const cookie = req.headers.cookie
  const value = cookie ? get(cartId, cookie) : null
  const key = value ? `${cartId}:${value}` : null

  // Stop right here if no key.
  if (!key) {
    return {
      data: null
    }
  }

  // Request body must be parsed first before connecting to Redis.
  const body = await normalizeBody(req)

  const { createClient } = await import('redis')
  const client = createClient()

  client.on('error', err => console.log('Redis Client Error', err))
  await client.connect()

  // Sets a time-to-live (TTL) of one minute for the cached data,
  // after which it will expire and the next request will have to
  // set the data again.
  // EX seconds -- Set the specified expire time, in seconds.
  // https://redis.io/commands/set/
  const data = await client.set(key, JSON.stringify(body), { 'EX': 60 * 5 })
  return {
    data
  }
}
