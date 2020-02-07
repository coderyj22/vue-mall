<template>
  <div class="cart-empty">
    <div class="empty-img">
      <img src="~/common/img/cart_empty.svg" alt="">
    </div>
    <div class="empty-title">购物车竟然是空的</div>
    <div class="empty-content">再忙，也要记得买点什么犒赏自己～</div>
    <div class="empty-see" @click="toHome">去逛逛</div>
  </div>
</template>

<script>
export default {
  name: "CartEmpty",
  methods:{
    toHome(){
      this.$router.push('home')
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .cart-empty
    margin-top 50%
    display flex
    flex-direction column
    align-items center
    transform translateY(-20%)
    .empty-img
      font-size: 12px
      img
        width: 80px

    .empty-title
      margin-top 20px
      color $color-theme-x
      font-size: $font-size-medium-x
    .empty-content
      margin-top 20px
      color $color-text-x
      font-size: $font-size-small
    .empty-see
      margin-top: 20px
      padding 10px
      border 1px solid #e8e8e8
      font-size 13px


</style>
