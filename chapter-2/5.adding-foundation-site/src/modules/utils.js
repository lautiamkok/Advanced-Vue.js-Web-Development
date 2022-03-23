'use strict'

import $ from 'jquery'
import 'foundation-sites'

// A helper for detecting the current screen size.
// https://get.foundation/sites/docs/media-queries.html
function currentScreen () {
  window.addEventListener('resize', () => {
    console.log('current screen size =',
      Foundation.MediaQuery.current
    )
  })
}

// You can create your own helper for for detecting the current screen size.
// https://get.foundation/sites/docs/media-queries.html#sass-reference
// Sass breakpoints:
// small: 0
// medium: 640px
// large: 1024px
// xlarge: 1200px
// xxlarge: 1440px
function currentBreakpoint () {
  const dev = import.meta.env.DEV
  if (!dev) {
    return
  }
  const xxlarge = '1440'
  const xlarge = '1200'
  const large = '1024'
  const medium = '640'
  const small = '0'
  window.addEventListener('resize', () => {
    const width = window.innerWidth
    let current
    if (width === xxlarge || width > xxlarge) {
      current = 'xxlarge'
    } else if (width === xlarge || width > xlarge) {
      current = 'xlarge'
    } else if (width === large || width > large) {
      current = 'large'
    } else if (width === medium || width > medium) {
      current = 'medium'
    } else if (width === small || width > small) {
      current = 'small'
    }
    console.log('current screen size =', current)
  })
}

export {
  currentScreen
}
