'use strict'

import blog from '@/pages/blog.vue'
import index from '@/pages/blog/index.vue'
import slug from '@/pages/blog/_slug.vue'
import layout from '@/middleware/layout/true'

export default {
  name: 'blog',
  path: '/blog',
  component: blog,

  // Nested routes.
  // https://next.router.vuejs.org/guide/essentials/nested-routes.html
  children: [
    {
      name: 'blog-index',
      // when /blog is matched
      path: '',
      component: index
    },
    {
      name: 'blog-slug',
      // when /blog/:slug is matched
      path: ':slug',
      component: slug,
      beforeEnter: [layout]
    }
  ],
}
