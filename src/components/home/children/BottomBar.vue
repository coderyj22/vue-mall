<template>
  <div class="bottom-bar">
    <div class="bottom-bar-left">
      <div class="left-item">
        <i class="icon shop"/>
        <span>店铺</span>
      </div>
      <div class="left-item">
        <i class="icon service"/>
        <span>客服</span>
      </div>
      <div class="left-item">
        <i class="icon collect"/>
        <span>收藏</span>
      </div>
    </div>
    <div class="bottom-bar-right">
      <div class="bar-right-add-cart" @click="addCart">加入购物车</div>
      <div class="bar-right-bug">立即购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BottomBar",
  methods:{
    addCart(){
      this.$emit('addCart')
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .bottom-bar
    position absolute
    bottom: 0
    left: 0
    right: 0
    height 43px
    border-top 1px solid #f8f8f8
    display flex

    .bottom-bar-left
      flex 0 0 150px
      display flex

      .left-item
        flex 1
        display flex
        flex-direction column
        align-items center
        justify-content space-around
        border-right: 1px solid #ededed

        .icon
          background url("~common/img/detail_bottom.png") 0 0 / 96%
          width 14px
          height 16px
          margin-top 3px

          &.shop
            background-position 0 -59px

          &.service
            background-position 0 -31px

          &.collection
            background-position 0 0px

        span
          font-size $font-size-small-s
          color $color-text
          margin-bottom 5px

    .bottom-bar-right
      flex 1
      display flex
      font-size: 13px
      .bar-right-add-cart
        color #ff5777
        flex 1
        background-color: #ffe6e8
        display-center()
      .bar-right-bug
        display-center()
        color #fff
        flex 1
        background: linear-gradient(90deg,#ff5777,#ff468f)


</style>
