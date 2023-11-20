'use strict'

// https://redis.io/docs/clients/nodejs/
import { createClient } from 'redis'

export default ctxHandler(async ctx => {
  const namespace = import.meta.env.VITE_APP_ERROR_NS
  const { get } = useCookie()

  // Get the value of the cart from cookie and use it to set a key in Redis
  // db, e.g. `example.com:cart:1683665729834`.
  const cookie = ctx.req.headers.cookie
  const value = cookie ? get(namespace, cookie) : null
  const key = value ? `${namespace}:${value}` : null
  // console.log(cookie)

  // Stop right here if no key.
  if (!key) {
    return null
  }

  // Request body must be parsed first before connecting to Redis.
  const body = await normalizeBody(ctx.req)
  // console.log('body =', body)

  const client = createClient()
  client.on('error', err => console.log('Redis Client Error', err))
  await client.connect()

  // Expire in [x] days.
  // const days = 30
  // const expire = days * 24 * 60 * 60
  
  // Expire in [x] minutes.
  const expire = 5 * 60

  // Sets a time-to-live (TTL) of one minute for the cached data,
  // after which it will expire and the next request will have to
  // set the data again.
  // EX seconds -- Set the specified expire time, in seconds.
  // https://redis.io/commands/set/
  return await client.set(key, JSON.stringify(body), { 'EX': expire })
})
