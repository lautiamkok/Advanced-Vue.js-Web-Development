<template>
  <ul class="dropdown menu" data-dropdown-menu>
    <li>
      <a href="#">Item 1</a>
      <ul class="menu">
        <li><a href="#">Item 1A</a></li>
        <li><a href="#">Item 1B</a></li>
        <li><a href="#">Item 1C</a></li>
      </ul>
    </li>
    <li><a href="#">Item 2</a></li>
    <li><a href="#">Item 3</a></li>
    <li><a href="#">Item 4</a></li>
  </ul>
  <div class="grid-container">
    <div class="grid-x grid-margin-x">
      <div class="cell small-4">cell</div>
      <div class="cell small-4">cell</div>
      <div class="cell small-4">cell</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

// Import Foundation.
// https://get.foundation/sites/docs/
import $ from 'jquery'
import 'foundation-sites'

// Import local modules.
import { currentScreen } from '@/modules/utils'

// Import Foundation style globally here or in `styles/index.js` if you plan to
// override some styles in Foundation.
// import 'foundation-sites/dist/css/foundation.min.css'

// You need to use jQuery for JavaScript features from Foundation, such as
// Dropdown Menu:
// https://get.foundation/sites/docs/dropdown-menu.html
onMounted(() => {
  $(document).foundation()
  currentScreen()
})
</script>
