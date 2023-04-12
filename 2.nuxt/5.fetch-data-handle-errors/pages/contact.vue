<template>
  <h2>
    Contact
  </h2>>
</template>

<script setup>
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
</script>
