'use strict'

import home from './home'
import about from './about'
import contact from './contact'
import shop from './shop'
import shopSlug from './shop/[slug]'
import blog from './blog'
import _all from './[...all]'
import _error from './[...error]'

const routes = [
  home,
  about,
  contact,
  shop,
  shopSlug,
  blog,
  _all,
  _error
]

export default routes
