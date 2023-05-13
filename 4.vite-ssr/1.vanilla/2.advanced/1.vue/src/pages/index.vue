<template>
  <p>Hello World</p>
  <p>{{ baz }} {{ doFoo('Foo') }}</p>
</template>

<script setup>
// Override the default head.
useHead({
  title: 'Hello World',
  meta: [
    {
      name: 'description',
      content: 'index description...'
    },
    {
      property: 'og:title',
      content: 'index og title...'
    },
    {
      property: 'og:description',
      content: 'index og description...'
    },
    {
      property: 'og:image',
      content: 'index og image...'
    },
  ],
})

const baz = useBaz()
const { doFoo } = useFoo()
console.log(doFoo('Fooo'))
</script>
