<template>
  <p class="text-blue">
    Hello World!
  </p>

  <p class="text-red-500 font-bold">
    NOTE: Nuxt 3.4 does not work well with TailWind CSS or Windi CSS. So you must install `consola` to resolve the issue: https://github.com/nuxt/nuxt/issues/20209
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
    focus:outline-none
    focus:shadow-outline"
  >
    I am a button
  </button>

  <button class="button">
    I am a button
  </button>
</template>
