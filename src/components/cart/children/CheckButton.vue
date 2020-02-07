<template>
  <div class="icon" @click="clickIcon">
    <img v-if="value" src="~/common/img/gou.svg" alt="">
    <div v-else class="no-select"></div>
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props:{
    value:{
      type:Boolean,
      default:true
    }
  },
  methods: {
    clickIcon() {
      this.$emit('clickIcon')
    }
  }
}
</script>

<style scoped lang="stylus">
  @improt '~common/stylus/variable'
  @improt '~common/stylus/mixin'
  .icon
    width 18px
    height 18px
    font-size: 0
    img
      width: 18px
      height: 18px

    .no-select
      width: 16px
      height: 16px
      border: 1px solid #ccc
      box-sizing border
      border-radius 50%
      background-color: #fff


</style>
