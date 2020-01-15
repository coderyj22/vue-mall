<template>
  <div class="tab-control">
    <div v-for="(item,index) in data" class="tab-item" @click="itemClick(index)">
      <span :class="{active:Index===index}">{{item}}</span>
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
      },
      currentIndex:{
        type:Number,
        default:0
      }
    },
    data(){
      return {
        Index:0
      }
    },
    watch:{
      currentIndex(){
        this.Index = this.currentIndex
      }
    },
    methods:{
      itemClick(index){
        this.Index = index
        this.$emit('itemClick',index)
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '~common/stylus/variable'
  .tab-control
    position: relative;
    z-index: 99
    background-color: $color-background
    display flex
    height 40px
    text-align center
    padding-bottom: 5px;
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