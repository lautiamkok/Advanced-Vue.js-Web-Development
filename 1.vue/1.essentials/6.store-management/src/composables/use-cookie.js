'use strict'

export default (name, options = {}) => {
  const Cookie = new cookie(options)
  
  // Sure no 'undefined' or `undefined` in the string before parsing.
  let string = Cookie.get(name)
  if (string === 'undefined' || string === undefined) {
    string = null
  }

  // Parse the string before setting it back to the reactive object.
  const cookieRef = ref(JSON.parse(string))

  // https://vuejs.org/api/reactivity-core.html#watch
  watch(cookieRef, (newVal, prevVal) => {
    // Uncomment to see the result.
    // console.log('newVal =', newVal)
    // console.log('cookieRef.value =', cookieRef.value)

    // Stringify the reactive object before storing.
    Cookie.set(name, JSON.stringify(cookieRef.value))
  }, {
    // Force deep traversal of the source if it is an object, so that the
    // callback fires on deep mutations.
    deep: true
  })
  
  return cookieRef
}
