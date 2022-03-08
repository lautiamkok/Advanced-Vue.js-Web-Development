<template>

  <div class="text-center p-3">
    <p class="text-red">I am a red text</p>
  </div>

  <div class="text-center p-3">
    <p class="text-blue">I become blue on hover</p>
  </div>

  <div class="text-center p-3">
    <button class="button">I am a button</button>
  </div>

  <div class="container mx-auto text-center space-y-3 space-between-link">
    <p>I am a paragraph with a <a href="#">link</a>.</p>
    <p>I am another paragraph with a <a href="#">link</a>.</p>
    <p>I am another paragraph with a <a href="#">link</a>.</p>
  </div>

  <h1 class="text-xl font-bold text-center p-3">Desktop First</h1>
  <div class="container mx-auto">

    <div class="flex flex-wrap justify-center items-center px-1.5">
      <div class="w-4/12 <lg:w-1/2 <md:w-full px-2.5">
        <img alt="afternoon" src="@/assets/afternoon.jpg" />
      </div>
      <div class="w-4/12 <lg:w-1/2 <md:w-full px-2.5">
        <img alt="afternoon" src="@/assets/afternoon.jpg" />
      </div>
      <div class="w-4/12 <lg:w-1/2 <md:w-full px-2.5">
        <img alt="afternoon" src="@/assets/afternoon.jpg" />
      </div>
    </div>

  </div>

  <h1 class="text-xl font-bold text-center p-3">Mobile First</h1>
  <div class="container mx-auto">

    <div class="flex flex-wrap justify-center items-center px-1.5">
      <div class="w-full md:w-1/2 lg:w-4/12 px-2.5">
        <img alt="afternoon" src="@/assets/afternoon.jpg" />
      </div>
      <div class="w-full md:w-1/2 lg:w-4/12 px-2.5">
        <img alt="afternoon" src="@/assets/afternoon.jpg" />
      </div>
      <div class="w-full md:w-1/2 lg:w-4/12 px-2.5">
        <img alt="afternoon" src="@/assets/afternoon.jpg" />
      </div>
    </div>

  </div>

  <img alt="afternoon" src="@/assets/afternoon.jpg" />
  <img alt="nightfall" src="/static/nightfall.jpg" />
</template>

<style lang="less">
// Variables
@text-color: red;

// Usage
.text-red {
  color: @text-color;
}

// Use with Windi
.text-blue {
  color: @text-color;

  &:hover {
    @apply
      text-blue-500;
  }
}
</style>
