<template>
  <scroll class="cart-list">
    <div>
      <cart-item v-for="item in cartList" @decrease="decrease" @increase="increase" :cart-data="item"></cart-item>
    </div>
  </scroll>
</template>

<script>
import Scroll from "base/scroll/Scroll";
import CartItem from "./CartItem";
export default {
  name: "CartList",
  components:{
    Scroll,
    CartItem
  },
  props:{
    cartList:{
      type:Array,
      default(){
        return []
      }
    }
  },
  mounted(){
    console.log(this.cartList);
  },
  methods:{
    increase(id){
      this.$emit('increase',id)
    },
    decrease(id){
      this.$emit('decrease',id)
    }
  }

}
</script>

<style scoped lang="stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'



</style>
