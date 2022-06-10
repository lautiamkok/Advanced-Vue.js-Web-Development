<template>
  <div>
    <h1>{{ title }}</h1>
    <div v-html="contents"></div>

    <p>Named export <code>useA</code> : {{ a }}</p>
    <p>Named export <code>useB</code> : {{ b }}</p>
    <p>Named export <code>useC</code> : {{ c }}</p>
    <p>Named export <code>useD</code> : {{ d }}</p>
    <p>Default export <code>useFoo</code> : {{ foo }}</p>
  </div>
</template>

<script setup>
const title = ref(null)
const contents = ref(null)

const a = useA()
const b = useB()
const c = useC()
const d = useD()
const foo = useFoo()

const config = useRuntimeConfig()
const { data } = await useFetch('/pages/pages__home__index', {
  baseURL: config.BASE_URL
})

// Populate the properties.
title.value = data.value.title
contents.value = data.value.contents
</script>

