<template>
  <div class="App">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
const layoutDefault = 'default'

export default {
  name: 'App',

  computed: {
    layout () {
      return 'layout-' + (this.$route.meta.layout || layoutDefault)
    }
  }
}
</script>

<style lang="less">
@import '~Styles/less/styles.less';
// @import '~Styles/css/styles.css';

// body {
//   &.dark {
//     background-color: @dark;
//     color: #fff;
//   }
// }

// .dark {
//   a {
//     color: #fff;
//   }
// }
</style>
