<template>
  <div class="dark">
    <slot/>
  </div>
</template>

<style>
.dark {
  background-color: #666;
}

.dark h1,
.dark h2,
.dark h3,
.dark p,
.dark a {
  color: #fff;
}
</style>
