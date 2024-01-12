<template>
  <component :is="layouts[layout]">
    <nav v-if="menu">
      <ul>
        <li v-for="(item, index) in menu">
          <router-link :to="item.path">{{ item.title }}</router-link>
        </li>
      </ul>
    </nav>
    <suspense>
      <router-view/>
    </suspense>
  </component>
</template>

<script setup>
import { ref, markRaw, watch } from 'vue'
import { useRoute } from 'vue-router'

// Import layouts.
import Default from '@/layouts/default.vue'
import Dark from '@/layouts/dark.vue'
import Light from '@/layouts/light.vue'

// Import mitt.
import emitter from '@/modules/emitter'

const route = useRoute()

// Create a lookup object to reference the components.
const layouts = {
  default: Default,
  light: Light,
  dark: Dark
}

// Set default layout.
const defaultLayout = 'default'
const layout = ref(defaultLayout)

// Listen on the `set-layout` event.
emitter.on('set-layout', (data) => {
  layout.value = data
})

// Reset layout when route changes.
// Or, use the afterEach global guard in `router.js`.
watch(
  () => route.path,
  path => {
    console.log('route.meta.layout =', route.meta.layout)
    if (route.meta.layout === undefined) {
      layout.value = defaultLayout
    }
  }
)

// Return the referenced variable rather than the component name.
// const defaultLayout = 'default'
// const layout = ref(markRaw(layouts[defaultLayout]))

// // Listen on the `set-layout` event.
// emitter.on('set-layout', (data) => {
//   layout.value = markRaw(layouts[data])
// })

// // Reset layout when route changes.
// watch(
//   () => route.path,
//   path => layout.value = markRaw(layouts[defaultLayout])
// )

const menu = [
  {
    title: 'Home',
    path: '/'
  },
  {
    title: 'About',
    path: '/about'
  },
  {
    title: 'Shop',
    path: '/shop'
  },
  {
    title: 'Product 1',
    path: '/shop/product-1'
  },
  {
    title: 'Product 2',
    path: '/shop/product-2'
  },
  {
    title: 'Blog',
    path: '/blog'
  },
  {
    title: 'Contact',
    path: '/contact'
  }
]
</script>
