<template>
  <div>
    <nav v-if="posts">
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

const { raw } = useError()
const { data: posts, error } = await useF3tch(`/wp-json/api/v1/posts`)
raw.value = error
</script>
