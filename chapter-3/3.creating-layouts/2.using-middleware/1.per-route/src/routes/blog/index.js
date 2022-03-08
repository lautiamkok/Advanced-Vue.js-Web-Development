'use strict'

import blog from '@/pages/blog.vue'
import index from '@/pages/blog/index.vue'
import slug from '@/pages/blog/_slug.vue'
import layout from '@/middleware/layout/fetch'

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
      component: index,
    },
    {
      name: 'blog-slug',
      // when /blog/:slug is matched
      path: ':slug',
      component: slug,

      // Note that `beforeEnter` is only triggered once. That means it won't
      // triggered again when going from /`post-2` to `/post-3`. So applying
      // middleware here is not a good idea if you need the layout to change
      // from one post page to another on the same dynamic route.
      beforeEnter: [layout],
    }
  ],
}
