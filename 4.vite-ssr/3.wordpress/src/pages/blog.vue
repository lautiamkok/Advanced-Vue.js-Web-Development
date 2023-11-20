<template>
  <div>
    <nav v-if="data">
      <router-link
        :to="'/blog/' + item.slug"
        v-for="(item, index) in posts"
      >
        {{ item.title }} /
      </router-link>
    </nav>
    <router-view :key="route.path" />
  </div>
</template>

<script setup>
// Bind a key the <router-view> so that Vue won't reuse the component.
// So that the content can be updated when route has changed.
const route = useRoute()

const { data, error } = await useF3tch(`/wp-json/api/v1/posts`)
if (error.value) {
  throwError({
    statusCode: error.value.statusCode,
    name: error.value.name,
    message: error.value.message
  })
}
if (!data.value) {
  throwError({
    statusCode: 500,
    message: 'No data!'
  })
}
const posts = unref(data)
</script>
