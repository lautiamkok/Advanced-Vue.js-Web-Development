'use strict'

import axios from 'axios'

export default axios.create({
  baseURL: import.meta.env.VITE_REMOTE_API_BASE_URL
})
