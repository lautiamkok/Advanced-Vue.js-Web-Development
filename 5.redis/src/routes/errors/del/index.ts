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

  const client = createClient()
  client.on('error', err => console.log('Redis Client Error', err))
  await client.connect()

  // Delete the key from db.
  // https://redis.io/commands/del/
  return await client.del(key)
})
