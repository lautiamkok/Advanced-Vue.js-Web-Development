'use strict'

import { ref } from 'vue'

// Must put the shared states outside the export block.
const layout = ref('default')

export default () => {
  return {
    layout
  }
}
