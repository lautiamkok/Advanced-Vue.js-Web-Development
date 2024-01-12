<template>

  <div class="text-center p-3">
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
    >I am a button</button>
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

  <current-breakpoint/>
</template>

<script setup>
import CurrentBreakpoint from '@/components/current-breakpoint.vue'
</script>
