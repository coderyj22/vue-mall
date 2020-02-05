<template>
  <scroll class="wrapper">
    <div class="menu">
      <div class="menu-item"
           @click="menuItemClick(index)"
           v-for="(item,index) in menuData"
           :class="{'active':currentIndex === index}">
        {{item.title}}
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from "base/scroll/Scroll";

export default {
  name: "CategoryMenu",
  components: {
    Scroll
  },
  props: {
    menuData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  created() {
    // console.log(this.menuData);
  },
  methods:{
    menuItemClick(i){
      this.currentIndex = i
      this.$emit('currentMenu',i)
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .wrapper
    height 100%
    .menu
      .menu-item
        height 45px
        display-center()
        background-color: #f6f6f6
        font-size: $font-size-medium
        &.active
          border-left: 2px solid $color-high-text
          background-color $color-background
          color $color-tint


</style>
