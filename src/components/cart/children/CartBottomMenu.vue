<template>
  <div class="cart-bottom-menu">
    <div class="menu-left">
      <check-button :value="allSelected" class="checked" @clickIcon="clickIcon"/>
      <div class="all-selected">全选</div>
    </div>
    <div class="menu-right">
      <div class="total" v-if="!selectDelete">
        <div class="total-text">合计：</div>
        <div class="total-price">¥ {{totalPrice}}</div>
      </div>
      <div v-if="!selectDelete" class="bug" @click="bug">结算</div>
      <div v-else class="del" @click="deleteDetail">删除</div>
    </div>
    <show-toast v-show="showToast" class="toast-no-selected" :text="title"/>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";
import ShowToast from "base/showtoast/ShowToast";

import {mapGetters, mapMutations} from 'vuex'

export default {
  name: "CartBottomMenu",
  components: {
    CheckButton,
    ShowToast
  },
  props: {
    selectDelete: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'totalPrice',
      'allSelected',
      'cartList'
    ])
  },
  data() {
    return {
      showToast: false,
      title: '您还没有选中宝贝哦'
    }
  },
  methods: {
    clickIcon() {
      let flag = this.allSelected
      flag = !flag
      this.setAllSelected(flag)
      this.setTotalPrice()
    },
    bug() {
      if (this.totalPrice === 0) {
        return
      }
      this.$emit('allBug')
    },
    showTitle(){
      this.showToast = true
      clearTimeout(this.time)
      this.time = setTimeout(() => {
        this.showToast = false
      }, 1000)
    },
    deleteDetail() {
      // 获取选中状态的宝贝 如果为0 显示弹出层 "您没有选中宝贝哦！" 如果有 "您确认删除吗？"
      let haveSel = false         // 是否有勾选的宝贝 默认为true
      if (this.cartList.length) {
        this.cartList.filter(item => {
          if (item.checked === true) {
            haveSel = true
          }
        })
        if (haveSel) {
          // 存在勾选的宝贝
          this.deleteInfo()
          return
        }else{
          this.title = '您还没有选中宝贝哦'
        }
      } else {
        // 购物车为空
        this.title = '您的购物车为空'
      }
      this.showTitle()
    },
    ...mapMutations({
      setAllSelected: 'ALL_SELECTED',
      setTotalPrice: 'TOTAL_PRICE',
      deleteInfo: 'DELETE_SELECT'
    })
  }
}
</script>

<style scoped lang="stylus">
  @improt '~common/stylus/variable'
  @improt '~common/stylus/mixin'

  .cart-bottom-menu
    display flex
    align-items center
    justify-content space-between

    .menu-left
      display flex
      align-items center

      .checked
        margin: 0 10px

      .all-selected
        color $color-text-x
        font-size: 12px

    .menu-right
      display flex
      align-items center

      .total
        color $color-text
        font-size 13px
        display flex

        .total-price
          color orangered
          margin-right 10px

      .bug
        width: 80px
        height 30px
        line-height 30px
        text-align center
        margin-right 10px
        border-radius 40px
        font-size: 14px
        color #fff
        background-color: orangered

      .del
        width: 50px
        height 25px
        line-height 25px
        text-align center
        margin-right 10px
        border-radius 20px
        font-size: 13px
        color red
        border: 1px solid red


    .toast-no-selected
      position absolute
      bottom 100px
</style>
