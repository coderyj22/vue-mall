<template>
  <div class="goods-item" @click="itemClick(goodsInfo)">
    <div class="img-info">
      <img @load="imgLoad" :src="goodsInfo.show.img" alt="">
    </div>
    <div class="text-info">
      <div class="title">{{goodsInfo.title}}</div>
      <div class="price-fav">
        <span class="price">¥{{goodsInfo.price}}</span>
        <span class="icon icon-collect"></span>
        <span class="fav">{{goodsInfo.cfav}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsItem",
    props: {
      goodsInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods:{
      imgLoad(){
        this.bus.$emit('imgLoad')
      },
      itemClick(goodsInfo){
        let id = goodsInfo.iid
        this.$emit('detailInfo',id)
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .goods-item
    width: 48%
    font-size $font-size-small
    margin: 0 0 3px 0
    .img-info
      margin-bottom 3px
      img
        width: 100%
        height 250px
        border-radius 5px

    .text-info
      .title
        no-wrap()
      .price-fav
        margin-top 3px
        text-align center
        .price
          color $color-tint
        .icon
          margin-left 3px
        .fav
          margin-left 3px
</style>