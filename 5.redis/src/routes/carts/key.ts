'use strict'

// https://redis.io/docs/clients/nodejs/
import { createClient } from 'redis'

export default ctxHandler(async ctx => {
  const key = ctx.params.key

  // Stop right here if no key.
  if (!key) {
    return null
  }

  const client = createClient()
  client.on('error', err => console.log('Redis Client Error', err))
  await client.connect()

  return JSON.parse(await client.get(key))
})
