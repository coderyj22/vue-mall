<template>
  <div class="tab-control">
    <div v-for="(item,index) in data" class="tab-item" @click="itemClick(index)">
      <span :class="{active:currentIndex===index}">{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props:{
      data:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        currentIndex:0
      }
    },
    methods:{
      itemClick(index){
        this.currentIndex = index
        console.log(index);
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '~common/stylus/variable'
  .tab-control
    display flex
    height 40px
    text-align center
    .tab-item
      flex 1
      line-height 40px
      box-sizing border-box

      span
        height 40px
        display inline-block
        box-sizing border-box
        &.active
          border-bottom: 2px solid $color-high-text

</style>