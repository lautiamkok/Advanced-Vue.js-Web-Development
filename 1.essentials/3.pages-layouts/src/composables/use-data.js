'use strict'

// Must put the shared states outside the export block.
const data = ref(null)

export default () => {
  return {
    data
  }
}
