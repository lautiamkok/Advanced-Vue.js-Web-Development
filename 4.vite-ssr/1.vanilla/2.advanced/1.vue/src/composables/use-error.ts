'use strict'

// Must put the shared states outside the export block.
const error = ref(false)

export default () => {
  return {
    error
  }
}
