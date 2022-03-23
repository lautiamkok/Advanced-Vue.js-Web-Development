'use strict'

// Create a event bus for passing data between components, instead of using
// Vuex. Use mitt instead for Vue.js 3.

// Option 1
// Usage: import Emitter from '@/plugins/emitter.js'
import mitt from 'mitt'
export default mitt ()

// Option 2
// Usage: import { Emitter } from '@/plugins/emitter.js'
// export const Emitter = mitt ()
