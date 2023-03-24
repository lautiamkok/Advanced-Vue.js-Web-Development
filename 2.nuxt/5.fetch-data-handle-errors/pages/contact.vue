<template>
  <!-- Option 1: -->
  <!-- <error-boundary v-bind:error="error">
    <div v-if="!error">
      <h2>{{ title }}</h2>
    </div>
  </error-boundary> -->

  <!-- Option 2: -->
  <div v-if="!error">
    <h2>{{ title }}</h2>
  </div>
  <error-handler 
    v-bind:error="error" 
    v-else 
  />
</template>

<script setup>
const error = ref()
const title = 'Contact'

try {
  // RangeError test:
  // 1.
  // const l = console.log
  // const arr = [90,88]
  // arr.length=90**99
  // 2.
  // function foo() {
  //  foo()
  // }
  // foo()

  // ReferenceError test:
  // const l=console.log
  // const cat = "cat"
  // cat
  // dog

  // TypeError test:
  const num = 123
  num.toUpperCase()
} catch (err) {
  error.value = err
}
</script>
