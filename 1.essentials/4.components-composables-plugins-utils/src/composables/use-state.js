'use strict'

// Must put the shared states outside the export block.
const state = ref(null)

export default () => {
  return state
}
