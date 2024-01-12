'use strict'

import { ref } from 'vue'

// Must put the shared states outside the export block.
const items = ref([])

export default () => {
  return {
    items
  }
}
