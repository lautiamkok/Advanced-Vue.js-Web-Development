'use strict'

// Create a event bus for passing data between components, instead of using
// Vuex. Use mitt instead for Vue.js 3.
// https://v3.vuejs.org/guide/migration/events-api.html#migration-strategy
// https://forum.vuejs.org/t/communicating-between-vue-instances-event-bus-mitt/107509
// https://morioh.com/p/f1bc7c5f9ca4
// https://stackoverflow.com/a/64019074/413225

// Option 1
// Usage: import Emitter from '@/plugins/emitter.js'
import mitt from 'mitt'
export default mitt ()

// Option 2
// Usage: import { Emitter } from '@/plugins/emitter.js'
// export const Emitter = mitt ()
