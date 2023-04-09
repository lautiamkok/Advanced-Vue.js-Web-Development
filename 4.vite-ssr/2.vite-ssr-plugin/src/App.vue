<template>
  <site-header/>
  <nav-main/>
  <router-view v-slot="{ Component }">
    <Suspense>
      <component :is="Component" />
    </Suspense>
  </router-view>
</template>

<script setup>
// Set default head.
// https://github.com/vueuse/head
useHead({
  title: '',
  meta: [
    {
      name: 'description',
      content: ''
    },
    {
      property: 'og:type',
      content: 'article'
    },
    {
      property: 'og:url',
      content: ''
    },
    {
      property: 'og:title',
      content: ''
    },
    {
      property: 'og:description',
      content: ''
    },
    {
      property: 'og:image',
      content: ''
    },
    {
      property: 'og:image:width',
      content: ''
    },
    {
      property: 'og:image:height',
      content: ''
    },
    {
      property: 'fb:app_id',
      content: ''
    },
    {
      name: 'twitter:site',
      content: ''
    },
    {
      name: 'twitter:creator',
      content: ''
    },
    {
      name: 'twitter:card',
      content: ''
    },
    {
      name: 'twitter:description',
      content: ''
    },
  ],
})
</script>
