'use strict'

// Must put the shared states outside the export block.
const raw = ref(false)

export default (req = null) => {
  // Standardise the error data from the raw error data.
  const error = computed(() => {
    let computedError = false
    if (raw.value) {
      computedError = {
        status: raw.value.status || 500,
        name: raw.value.name || 'Internal Server Error',
        message: raw.value.message,
        stack: raw.value.stack,
        final: raw.value.final
      }
    }
    return computedError
  })

  return {
    raw,
    error
  }
}
