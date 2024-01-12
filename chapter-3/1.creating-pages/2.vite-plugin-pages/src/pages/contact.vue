<template>
  <h1>{{ title }}</h1>
</template>

<script setup>
const title = 'Contact'

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

// SyntaxError test (will be catched by Vite automatically so can't test it here):
// const l = console.log
// let cat h = "cat"

// TypeError test:
const num = 123
num.toUpperCase()
</script>
