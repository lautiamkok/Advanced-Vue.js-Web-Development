'use strict'

// https://redis.io/docs/clients/nodejs/
import { createClient } from 'redis'

function getCookie (name, cookie) {
  const resource = cookie ?? document.cookie
  
  let string = resource.match(`(?:(?:^|.*; *)${name} *= *([^;]*).*$)|^.*$`)[1]
  if (string) {
    string = decodeURIComponent(string)
  }
  if (string === 'undefined' || string === undefined) {
    string = null
  }

  return JSON.parse(string)
}

async function normalizeBody (req) {
  let body = []
  const requestMethods = ['PATCH', 'POST', 'PUT', 'DELETE']
  if (requestMethods.includes(req.method)) {
    for await (const chunk of req) {
      body += chunk
    }

    if (req.headers['content-type']?.includes('application/json')) {
      body = isJson(body) ? JSON.parse(body) : body
    }
  }

  return body
}

function isJson (str) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

export default async (req, res) => {
  const cartId = 'example.com:cart'

  // Get the value of the cart from cookie and use it to set a key in Redis
  // db, e.g. `example.com:cart:1683665729834`.
  const cookie = req.headers.cookie
  const value = cookie ? getCookie(cartId, cookie) : null
  const key = value ? `${cartId}:${value}` : null

  // Stop right here if no key.
  if (!key) {
    return null
  }

  // Request body must be parsed first before connecting to Redis.
  const body = await normalizeBody(req)

  const client = createClient()
  client.on('error', err => console.log('Redis Client Error', err))
  await client.connect()

  // Sets a time-to-live (TTL) of one minute for the cached data,
  // after which it will expire and the next request will have to
  // set the data again.
  // EX seconds -- Set the specified expire time, in seconds.
  // https://redis.io/commands/set/
  return await client.set(key, JSON.stringify(body), { 'EX': 60 * 5 })
}
