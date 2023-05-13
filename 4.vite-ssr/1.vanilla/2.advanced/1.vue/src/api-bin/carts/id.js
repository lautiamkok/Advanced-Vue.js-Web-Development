'use strict'

// https://redis.io/docs/clients/nodejs/
import { createClient } from 'redis'

export default async (req, res, id) => {
  // Stop right here if no id.
  if (!id) {
    return null
  }

  const client = createClient()
  client.on('error', err => console.log('Redis Client Error', err))
  await client.connect()

  console.log('await client.get(id) =', await client.get(id))

  return JSON.parse(await client.get(id))
}
