<template>
  <p class="text-blue-500">
    Hello World!
  </p>

  <p class="text-blue">
    I am blue
  </p>

  <p class="text-red">
    I am red
  </p>

  <div class="container mx-auto space-y-3 has-links border-1">
    <p>
      I am a paragraph with a <a href="#">link</a>.
    </p>
    <p>
      I am another paragraph with a <a href="#">link</a>.
    </p>
    <p>
      I am another paragraph with a <a href="#">link</a>.
    </p>
  </div>

  <button
    class="bg-gray-900
    hover:bg-violet-600
    text-white
    font-bold
    py-2
    px-4
    rounded
    focus:outline-none"
  >
    I am a button
  </button>

  <button class="button">
    I am a button
  </button>
</template>

<style lang="less">
@text-color: red;

.text-red {
  color: @text-color;

  &:hover {
    @apply
      text-blue-500;
  }
}
</style>
