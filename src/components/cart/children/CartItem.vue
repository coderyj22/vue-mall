<template>
  <div class="cart-item">
    <div class="shop-title">
      <div class="title-control">
        <check-button :value="cartData.checked" @clickIcon="clickIcon"></check-button>
      </div>
      <div class="title-img">
        <img :src="cartData.shopLogo" alt="">
      </div>
      <div class="title-name">{{cartData.shopName}}</div>
    </div>
    <div class="container">
      <div class="info-control"></div>
      <div class="info-img">
        <img :src="cartData.imgUrl" alt="">
      </div>
      <div class="info-content">
        <div class="content-detail">{{cartData.title}}</div>
        <div class="content-description">{{cartData.desc}}</div>
        <div class="content-other">
          <div class="other-price">{{cartData.price}}</div>
          <div class="other-control">
            <button @click="decrease">-</button>
            <span>{{cartData.count}}</span>
            <button @click="increase">+</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";
import {mapMutations} from 'vuex'
export default {
  name: "CartItem",
  components:{
    CheckButton
  },
  props: {
    cartData: {
      type: Object
    }
  },
  mounted() {
    console.log(this.cartData);
  },
  methods:{
    decrease(){
      this.$emit('decrease',this.cartData.id)
    },
    increase(){
      this.$emit('increase',this.cartData.id)
    },
    clickIcon(){
      this.cartData.checked = !this.cartData.checked
      // const id = this.cartData.id
      this.setChecked(this.cartData.checked)
      this.setTotalPrice()

    },
    ...mapMutations({
      setChecked: 'CHANGE_CHECKED',
      setTotalPrice:'TOTAL_PRICE'
    })
  }

}
</script>

<style scoped lang="stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .cart-item
    margin: 15px 15px 5px 15px
    display flex
    flex-direction column
    justify-content space-around
    background-color: $color-background
    padding 10px 0

    .shop-title
      display flex
      align-items center

      .title-control
        flex 0 0 20px
        margin-left 10px

      .title-img
        flex 0 0 50px
        width: 50px
        height: 50px
        margin-right 10px
        display-center()

        img
          width: 30px
          border-radius 3px

      .title-name
        flex 1
        color $color-theme-x
        font-size: $font-size-medium

    .container
      display flex
      margin-top: 5px

      .info-control
        flex 0 0 20px

      .info-img
        width 80px
        height 100px
        flex 0 0 80px

        img
          width: 80px
          height 100px
          border-radius 5px

      .info-content
        flex 1
        margin-left 10px
        display flex
        justify-content space-around
        flex-direction column
        margin-right 20px
        max-width 200px
        no-wrap()

        .content-detail
          color $color-theme-x
          font-size: $font-size-medium-x

        .content-description
          color $color-text-x
          font-size: 13px

        .content-other
          display flex
          justify-content space-between

          .other-price
            color orangered

          .other-control
            font-size $font-size-small
            border: 1px solid #ebebeb
            display flex
            border-radius 5px
            button
              width 20px
              border: 0
              background-color: #fff
            span
              display-center()
              width 40px
              border-left 1px solid #ebebeb
              border-right 1px solid #ebebeb


</style>
