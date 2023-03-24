import useError from '@/composables/use-error'

export default (to, from, failure) => {
  const { error } = useError()
  error.value = false
  console.log('log:from.from =', from.name)
  console.log('log:to.name =', to.name)
  console.log('middleware error =', error.value)
}
