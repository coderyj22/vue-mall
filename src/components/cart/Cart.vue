<template>
  <div class="cart">
    <nav-bar class="nav-bar-cart">
      <div slot="center" class="cart-center">购物车 ({{cartCount}})</div>
      <div slot="right" class="control" @click="controlClick">
        <div v-if="!selectDelete" class="manage">管理</div>
        <div v-else class="complete">完成</div>
      </div>
    </nav-bar>
    <cart-list class="content" @increase="increase" @decrease="decrease" :cart-list="cartList"/>
    <cart-empty class="cart-empty" v-show="!cartList.length"/>
    <cart-bottom-menu @allBug="allBug" class="bottom-menu" :select-delete="selectDelete" />
    <show-toast v-show="showToast" :text="bugAll"/>
  </div>
</template>

<script>
import NavBar from "base/navbar/NavBar";
import CartList from "./children/CartList";
import CartBottomMenu from "./children/CartBottomMenu";
import CartEmpty from "./children/CartEmpty";
import ShowToast from "base/showtoast/ShowToast";
import {mapGetters} from 'vuex'
import {mapMutations} from 'vuex'

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomMenu,
    CartEmpty,
    ShowToast
  },
  computed: {
    ...mapGetters([
      'cartList',
      'cartCount',
      'totalPrice'
    ]),
    bugAll(){
      return `您一共需要花费${this.totalPrice}元`
    }
  },
  data() {
    return {
      showToast: false,
      selectDelete:false
    }
  },
  methods: {
    decrease(id) {
      const shopInfo = this.findInfo(id)
      this.setDecrementCart(shopInfo)
      this.calcTotalPrice()
    },
    increase(id) {
      const shopInfo = this.findInfo(id)
      this.setAddCart(shopInfo)
      this.calcTotalPrice()
    },
    findInfo(id) {
      return this.cartList.find(item => {
        return item.id === id
      })
    },
    controlClick(){
      this.selectDelete = !this.selectDelete
    },
    allBug() {
      this.showToast = true
      clearTimeout(this.time)
      this.time = setTimeout(() => {
        this.showToast = false
      }, 1000)
    },
    ...mapMutations({
      setAddCart: 'ADD_TO_CART',
      setDecrementCart: 'DECREMENT_TO_CART',
      calcTotalPrice: 'TOTAL_PRICE'
    })
  }
}
</script>

<style scoped lang="stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  .nav-bar-cart
    font-size $font-size-large
    background-color: $color-tint
    color $color-background

    .cart-center
      font-weight bold
    .control
      font-size: 14px

  .bottom-menu
    position absolute
    bottom: 50px
    height 40px
    width: 100%
    background-color: $color-background
    border-top 1px solid $color-background-x


  .content
    position absolute
    top 44px
    bottom 90px
    width 100%
    background-color: #f9f9f9

  .cart-empty
    position absolute
    top: 44px
    bottom: 91px
    width: 100%
</style>
