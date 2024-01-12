export default (to, from, next) => {
  console.log('log:from.from =', from.name)
  console.log('log:to.name =', to.name)
  next()
}
