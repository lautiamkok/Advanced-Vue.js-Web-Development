<template>
  <h2>{{ title }}</h2>
  <li
    v-for="post in posts"
    v-bind:key="post.id"
    v-if="posts !== null"
  >
    <post-item
      v-bind:title=post.title
      v-bind:excerpt=post.excerpt
      v-bind:date=useDate(post.meta.createdAt)
      v-bind:path=usePath(post.slug)
      v-bind:thumbnail=post.thumbnail
      v-bind:meta=post.meta
    />
  </li>
</template>

<script setup>
import { ref } from 'vue'
import useFetch from '@/composables/use-fetch'
import usePath from '@/composables/use-path'
import useDate from '@/composables/use-date'
import { throwError } from '@/modules/utils'
import postItem from '@/components/post-item.vue'

const posts = ref({})
const title = 'Blog Index'

// Fetch the data and populate.
const { data } = await useFetch('/posts')
posts.value = data
</script>
