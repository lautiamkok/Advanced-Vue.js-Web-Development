<template>
  <div>
    <h2>{{ title }}</h2>
    <nav v-if="posts">
      <router-link
        :to="'/blog/' + item.slug"
        v-for="(item, index) in posts"
      >
        {{ item.title }} /
      </router-link>
    </nav>

    <post-item
      v-bind:title="'Sample Post 1'"
      v-bind:excerpt="'Example on how to pass data to components.'"
      v-bind:date="useDate('2021-09-23T16:29:51.022Z')"
    />
  </div>
</template>

<script setup>
import useFetch from '@/composables/use-fetch'
import { throwError } from '@/modules/utils'
import useDate from '@/composables/use-date'

const title = 'Blog Index'
const posts = ref([])

const { data } = await useFetch(`/wp-json/api/v1/posts`)
if (data) {
  posts.value = data
}
</script>
