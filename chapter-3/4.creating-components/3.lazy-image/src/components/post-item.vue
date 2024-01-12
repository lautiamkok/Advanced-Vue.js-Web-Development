<template>
  <lazy-bg
    v-bind:src="thumbnail.src"
    v-bind:relative-path="meta.relativePath"
    class="
      w-full
      h-lg
      bg-cover
      bg-center
      flex-center-xy
    "
  >
    <h2 class="
      bg-purple-600
      text-white
      p-3
    ">
      <router-link :to="path">
        {{ title }}
      </router-link>
    </h2>
  </lazy-bg>

  <p>{{ date }}</p>

  <div>
    <p v-html="excerpt"></p>
  </div>
</template>

<script setup>
// Define props. defineProps and defineEmits do not need to be imported, and are
// compiled away when <script setup> is processed.
const props = defineProps({
  title: String,
  path: String,
  excerpt: String,
  date: String,
  thumbnail: Object,
  meta: Object
})
</script>
