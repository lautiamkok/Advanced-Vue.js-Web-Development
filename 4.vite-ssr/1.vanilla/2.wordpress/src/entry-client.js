'use strict'

import { createApp } from './main'

const { app, router } = createApp()

// wait until router is ready before mounting to ensure hydration match
async function hydrate() {
  await router.isReady()
  app.mount('#app')
  console.log('hydrated')
}
hydrate()

// Or, using a chain:
// router.isReady().then(() => {
//   app.mount('#app')
//   console.log('hydrated')
// })
