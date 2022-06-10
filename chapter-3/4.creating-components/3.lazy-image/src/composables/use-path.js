// You can't create a computed property for each iteration. So create a function
// to compute in the v-loop.
export default slug => {
  const route = useRoute()
  return `${route.fullPath}/${slug}`
}
