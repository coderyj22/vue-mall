<template>
  <div class="user-info">
    <div class="user-info-top">
      <div class="user-img">
        <img src="~common/img/profile.svg" alt="">
      </div>
      <div class="user-detail">
        <div class="detail-top">登陆/注册</div>
        <div class="detail-bottom">
          <div class="phone-icon">
            <img src="~/common/img/phone.svg" alt="">
          </div>
          <div class="phone-text">暂无绑定手机号</div>
        </div>
      </div>
      <div class="arrow">
        <img src="~common/img/right_arrow.svg" alt="">
      </div>
    </div>
    <div class="user-info-bottom">
      <div class="account">
        <div class="account-item">
          <div class="number">
            <span class="number-bold">{{number | formatPrice}}</span>
            <span class="number-yuan">元</span>
          </div>
          <div class="number-text">我的余额</div>
        </div>
        <div class="account-item">
          <div class="number">
            <span class="number-bold">{{coupon}}</span>
            <span class="number-yuan">个</span>
          </div>
          <div class="number-text">我的优惠卷</div>
        </div>
        <div class="account-item">
          <div class="number">
            <span class="number-bold">{{integral}}</span>
            <span class="number-yuan">分</span>
          </div>
          <div class="number-text">我的积分</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      number: 0.00,
      coupon:0,
      integral:0
    }
  },
  filters: {
    formatPrice(price) {
      let newPrice = price.toString()
      newPrice += '.00'
      return newPrice
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .user-info-top
    padding 15px
    display flex
    align-items center
    background-color: $color-tint

    .user-img
      flex 0 0 60px
      height 60px
      background-color: #fff
      border-radius 50%
      margin-right: 10px

      img
        width: 60px
        height: 60px

    .user-detail
      flex 1
      display flex
      flex-direction column
      align-content space-around

      .detail-top
        color #fff
        margin-bottom: 5px

      .detail-bottom
        display flex
        margin-top: 5px
        align-items center

        .phone-icon
          img
            width: 20px
            height: 20px
            color #fff

        .phone-text
          color #fff
          margin-left: 5px
          font-size $font-size-small

  .user-info-bottom
    border-bottom 10px solid #f2f2f2
    .account
      display flex

      .account-item
        padding: 18px
        flex 1
        display flex
        flex-direction column
        justify-content space-around
        border-right 1px solid #f2f2f2

        .number
          text-align center
          .number-bold
            color #ff5f3e
            font-weight: 700
            font-size: 24px
            margin-right 3px
        .number-text
          margin-left: 4px
          margin-top: 7px
          font-size: 13px
</style>
