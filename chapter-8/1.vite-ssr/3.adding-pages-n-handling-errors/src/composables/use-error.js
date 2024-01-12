'use strict'

import { onBeforeRouteLeave } from 'vue-router'

const error = ref(false)
const message = ref()
const statusCode = ref(200)
const stack = ref()

export default async () => {
  return { 
    error, 
    message, 
    statusCode 
  }
}
