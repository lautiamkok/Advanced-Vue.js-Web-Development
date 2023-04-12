'use strict'

// Dummy data.
const posts = [
  {
    path: '/about',
    layout: 'light',
    contents: '<p>Hello About!</p>'
  },
  {
    path: '/blog',
    layout: 'dark',
    contents: '<p>Welcome to my blog!</p>'
  },
  {
    path: '/blog/post-2',
    layout: 'light',
    contents: '<p>Content Post 2</p>'
  }
]

export default async (to, from, next) => {
  const { data } = useData()

  // Reset the data before each route.
  data.value = null

  // Find the requested post from the dummy posts.
  const post = posts.find(post => post.path === to.path)

  // Set default layout here to avoid flickering when refreshing.
  // Set the layout dynamically from the fetched data.
  to.meta.layout = 'default'
  if (post !== undefined) {
    data.value = post
    to.meta.layout = post.layout
  }

  // Pass the middleware queue to the next middleware.
  next()
}
