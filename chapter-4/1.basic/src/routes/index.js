'use strict'

import index from './index/index'
import error404 from './404/index'
import error from './error/index'

const routes = [
  index,
  error404,
  error
]

export default routes
