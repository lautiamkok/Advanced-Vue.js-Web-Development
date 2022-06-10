<template>
  <div>
    <h1>{{ title }}</h1>
    <div v-html="contents"></div>
    <nav v-if="menu">
      <ul>
        <li v-for="(item, index) in menu">
          <router-link :to="item.path">{{ item.title }}</router-link>
        </li>
      </ul>
    </nav>
    <router-view :key="route.path"></router-view>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useFetch from '@/composables/use-fetch'
import { throwError } from '@/modules/utils'

// Bind a key the <router-view> so that Vue won't reuse the component.
// So that the content can be updated when route has changed.
import { useRoute } from 'vue-router'

const route = useRoute()
const title = ref(null)
const contents = ref(null)
const menu = [
  {
    title: 'Post 1',
    path: '/blog/post-1'
  },
  {
    title: 'Post 2',
    path: '/blog/post-2'
  },
]

const { data } = await useFetch('/pages/pages__blog__index')
if (data === null) {
  throwError('Sorry, we cannot find the requested page.', 404)
}

// Populate the properties.
title.value = data.title
contents.value = data.contents
</script>
