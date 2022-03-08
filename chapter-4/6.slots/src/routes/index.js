'use strict'

import index from './index/index'
import about from './about/index'
import contact from './contact/index'
import cart from './cart/index'
import shop from './shop/index'
import shopSlug from './shop/_slug'
import blog from './blog/index'
import error404 from './404/index'
import error from './error/index'

const routes = [
  index,
  about,
  contact,
  cart,
  shop,
  shopSlug,
  blog,
  error404,
  error
]

export default routes
