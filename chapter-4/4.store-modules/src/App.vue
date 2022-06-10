<template>
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
</template>

<script setup>
const store = useStore()

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
    title: 'Blog',
    path: '/blog'
  },
  {
    title: 'Contact',
    path: '/contact'
  },
  {
    title: 'Cart',
    path: '/cart'
  }
]

onMounted(async () => {
  // Populate the cart.
  store.dispatch('cart/populate')
})
</script>
