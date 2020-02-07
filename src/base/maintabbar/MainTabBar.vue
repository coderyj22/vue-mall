<template>
  <div class="main-tab-bar">
    <router-link tag="div" class="tab-item" to="/home">
      <i class="icon icon-home"></i>
      <span class="text">首页</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/category">
      <i class="icon icon-category"></i>
      <span class="text">分类</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/cart">
      <i class="icon icon-cart"></i>
      <span class="text">购物车</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/profile">
      <i class="icon icon-profile"></i>
      <span class="text">我的</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "MainTabBar",
  components: {}
}
</script>

<style scoped lang="stylus">
  @import '~common/stylus/variable'
  .main-tab-bar
    position fixed
    z-index 1000
    bottom: 0
    width: 100%
    height 49px
    border-top: 1px solid $color-background-x
    background-color: $color-background
    display flex
    justify-content center
    align-items center

    .tab-item
      flex 1
      height 100%
      display flex
      flex-direction column
      justify-content center
      align-items center

      .icon
        font-size: $font-size-large
        margin-bottom 7px

      .text
        color #666
        font-size: $font-size-small

      &.router-link-active
        .icon
          color $color-tint

        .text
          color $color-tint


</style>
