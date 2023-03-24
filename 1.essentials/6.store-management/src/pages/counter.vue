<template>
  <h2>
    Counter
  </h2>
  <p>
    store.count: {{ store.count }}
  </p>
  <p>
    doubleValue: {{ doubleValue }}
  </p>
  <button @click="store.increment()">
    +
  </button>
  <button @click="store.decrement()">
    -
  </button>
  <button @click="store.reset()">
    Reset
  </button>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'

const store = useCounterStore()
const doubleValue = computed(() => store.doubleCount)
</script>
