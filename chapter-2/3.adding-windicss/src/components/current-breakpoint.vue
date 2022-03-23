<template>
  <div
    class="fixed bottom-0 right-0 py-1.5 px-3 bg-black text-white text-sm"
    v-if="dev"
  >
    <span>Current breakpoint: </span>
    <span class="sm:hidden md:hidden lg:hidden xl:hidden font-bold">&lt; sm</span>
    <span class="hidden sm:inline md:hidden font-bold">sm</span>
    <span class="hidden md:inline lg:hidden font-bold">md</span>
    <span class="hidden lg:inline xl:hidden font-bold">lg</span>
    <span class="hidden xl:inline font-bold">xl</span>
  </div>
</template>

<script setup>
// https://vitejs.dev/guide/env-and-mode.html#env-variables
const dev = import.meta.env.DEV
</script>
