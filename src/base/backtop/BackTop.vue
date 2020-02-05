<template>
  <div class="back-top" @click="backTopClick">
    <i class="icon icon-backtop"></i>
  </div>
</template>

<script>
  export default {
    name: "BackTop",
    methods:{
      backTopClick(){
        this.$emit('backTopClick')
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  .back-top
    position: fixed;
    z-index 999
    right: 15px
    bottom: 70px
    width: 30px
    height: 30px
    border-radius 50%
    /*border: 1px solid $color-theme*/
    display flex
    justify-content center
    align-items center
    background-color:$color-background-d

    .icon
      font-size 25px

</style>
