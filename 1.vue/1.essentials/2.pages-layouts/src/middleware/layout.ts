'use strict'

// Dummy data.
const posts = [
  {
    path: '/about',
    layout: 'light'
  },
  {
    path: '/blog',
    layout: 'dark'
  },
  {
    path: '/blog/post-2',
    layout: 'light'
  }
]

export default async (to, from, next) => {
  // Find the requested post from the dummy posts.
  const post = posts.find(post => post.path === to.path)

  // Set default layout here to avoid flickering when refreshing.
  // Set the layout dynamically from the fetched data.
  to.meta.layout = 'default'
  if (post !== undefined) {
    to.meta.layout = post.layout
  }

  // Pass the middleware queue to the next middleware.
  next()
}
