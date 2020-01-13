<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in data">
      <a :href="item.link">
        <div class="top-img">
          <img :src="item.image" alt="">
        </div>
        <span class="bottom-text">{{item.title}}</span>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Recommend",
    props:{
      data:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '~common/stylus/variable'
  .recommend
    width: 100%
    margin-top 20px
    display flex
    justify-content space-around
    align-items center
    padding-bottom: 25px
    border-bottom: 10px solid #eee
    .recommend-item
      a
        text-decoration none
        display inline-block
        text-align center
        .top-img
          img
            width: 70px
            height: 70px
        .bottom-text
          display inline-block
          margin-top 5px
          font-size:$font-size-medium

</style>