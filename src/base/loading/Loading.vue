<template>
  <div class="loading">
    <img src="./loading.gif" alt="">
    <div class="text">{{text}}</div>
  </div>
</template>

<script>
  export default {
    name: "Loading",
    props: {
      text: {
        type: String,
        default: '正在加载……'
      }
    }
  }
</script>

<style scoped lang="stylus">
  .loading
    text-align center
    img
      width: 24px
      height: 24px

</style>