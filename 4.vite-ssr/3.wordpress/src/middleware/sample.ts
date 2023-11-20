export default (to, from, next) => {
  // ...

  // Return false when you want to cancel/ reject the navigation
  return false

  // Call `next` when you want to pass the middleware queue to the next
  // middleware.
  next()
}
