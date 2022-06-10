'use strict'

import { createApp } from './main.js'

const { app, router } = createApp()

// wait until router is ready before mounting to ensure hydration match
async function hydrate() {
  await router.isReady()
  app.mount('#app')
}
hydrate()

// router.isReady().then(() => {
//   app.mount('#app')
// })
