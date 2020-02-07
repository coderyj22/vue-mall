<template>
  <div class="show-toast">
    <div class="text">
      {{text}}
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowToast",
  props:{
    text:{
      type:String,
      default:'弹窗文字'
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .show-toast
    position absolute
    top: 50%
    left: 50%
    transform translateX(-50%) translateY(-50%)
    padding 5px 10px
    height 40px
    background-color: rgba(0,0,0,.4)
    z-index 100000
    .text
      color rgba(255,255,255,.9)
      font-size: $font-size-small
      line-height 40px
      text-align center

</style>
