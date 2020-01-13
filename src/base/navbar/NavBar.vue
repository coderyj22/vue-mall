<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped lang="stylus">
  .nav-bar
    width: 100%
    height 44px
    display flex
    position relative
    z-index 99
    .left
      flex 0 0 60px
    .right
      flex 0 0 60px
    .center
      flex 1


</style>