<template>
  <transition name="slide" class="slide">
    <div class="good-detail">
      <nav-bar class="nav-bar">
        <div slot="left" @click="backClick">
          <i class="icon icon-back"></i>
        </div>
        <div slot="center" class="center">
          <div class="item"
               v-for="(item,index)
             in tabBar"
               @click="tabBarClick(index)"
               :class="{active:currentIndex===index}">{{item}}
          </div>
        </div>
      </nav-bar>
      <scroll class="content" v-if="dataInfo" ref="scroll">
        <div class="wrapper">
          <div class="slider-wrapper">
            <slider :loop="true" :autoPlay="true" v-if="topImages.length" :data="topImages">
              <a href="" v-for="item in topImages">
                <img :src="item" alt="">
              </a>
            </slider>
          </div>
          <div class="base-info">
            <h3 class="title">{{dataInfo.title}}</h3>
            <div class="price">
              <span class="now">{{dataInfo.nowPrice}}</span>
              <span class="old">{{dataInfo.oldPrice}}</span>
              <span class="discount">{{dataInfo.discountDesc}}</span>
            </div>
            <div class="columns">
              <span v-for="column in dataInfo.columns">{{column}}</span>
            </div>
            <div class="services">
              <div class="services-item" v-for="item in dataInfo.services" v-if="item.icon">
                <span class="services-icon">
                  <img :src="item.icon" alt="">
                </span>
                <span class="services-name">{{item.name}}</span>
              </div>
            </div>
          </div>
          <div class="shop-info">
            <div class="shopTitle">
              <div class="logo">
                <img :src="dataInfo.shopLogo" alt="">
              </div>
              <div class="shopName">{{dataInfo.shopName}}</div>
            </div>
            <div class="shop-middle">
              <div class="shop-m-left">
                <div class="shop-sell">
                  <span class="s-sells">{{dataInfo.cSells}}</span>
                  <span class="s-sell-text">总销量</span>
                </div>
                <div class="shop-sell">
                  <span class="s-sells">{{dataInfo.cGoods}}</span>
                  <span class="s-sell-text">全部宝贝</span>
                </div>
              </div>
              <div class="shop-m-right">
                <table>
                  <tr v-for="item in dataInfo.score">
                    <td>{{item.name}}</td>
                    <td :style="{color:item.isBetter ? 'red' : 'green'}">
                      {{item.score | format}}
                    </td>
                    <td v-if="item.isBetter" class="high"><span>高</span></td>
                    <td v-else class="low"><span>低</span></td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="shop-bottom">
              <div class="btn"><a :href="dataInfo.shopUrl">进店逛逛</a></div>
            </div>
          </div>
          <div class="desc-title">
            {{dataInfo.desc}}
          </div>
          <div class="desc-key">
            穿着效果
          </div>
          <div class="desc-list">
            <div class="list" v-for="item in dataInfo.list">
              <img @load="imgLoad" :src="item" alt="">
            </div>
          </div>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
            <li>10</li>
          </ul>
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script>
  import NavBar from "base/navbar/NavBar";
  import Slider from "base/slider/Slider";
  import Scroll from "base/scroll/Scroll";
  import {getDetail} from "network/home";
  import {GoodInfo} from "common/js/myClass";
  import {debounce} from "common/js/util";

  export default {
    name: "GoodDetail",
    components: {
      NavBar,
      Slider,
      Scroll
    },
    data() {
      return {
        id: null,
        tabBar: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0,
        topImages: [],         // 轮播图数据
        dataInfo: {}
      }
    },
    created() {
      this.id = this.$router.history.current.params.id
      this._getDetail()
    },
    computed:{
      addCls(isBetter){
        console.log(isBetter);
        return 1
      }
    },
    mounted() {
    },
    filters: {
      format(num) {
        let len = num.toString().length
        if (len >= 4) {
          return num
        }
        num += '.'
        len++
        while (len < 4) {
          num = num + '0'
          len++
        }
        return num
      }
    },
    methods: {
      _getDetail() {
        getDetail(this.id).then(res => {
          this.topImages = res.data.result.itemInfo.topImages
          this.dataInfo = this._normalizeData(res.data.result)
          console.log(this.dataInfo);
          console.log(res.data.result);
        })
      },
      tabBarClick(i) {
        this.currentIndex = i
      },
      backClick() {
        this.$router.back()
      },
      imgLoad(){
        // debounce(this.$refs.scroll.refresh(),100)
        if(this.timer){
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(()=>{
          this.$refs.scroll.refresh()
        },200)
      },
      _normalizeData(data) {
        let ret = []
        ret.push(new GoodInfo(data.columns, data.itemInfo, data.shopInfo,data.detailInfo))
        return ret[0]
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .good-detail
    position: fixed;
    top: 0
    bottom: 0
    left: 0
    right: 0
    z-index 1000
    background-color: $color-background

    .nav-bar
      position fixed
      top: 0
      width: 100%
      z-index 9
      background-color: $color-background
      color $color-theme-x

      .icon
        font-size 25px

      .center
        display flex
        text-align center

        .item
          flex 1
          color $color-theme-x

          &.active
            color: $color-tint

    .content
      position: absolute;
      top 44px
      bottom: 0
      width: 100%
      z-index 9
      overflow hidden

      .wrapper
        overflow: hidden;
        position relative

        .slider-wrapper
          position: relative;
          width: 100%
          z-index 10
          overflow: hidden;
          height 300px

        .base-info
          padding 10px
          margin-bottom: 10px

          .title
            font-size: $font-size-medium
            color $color-theme-x
            margin-bottom: 10px

          .price
            color $color-tint
            font-size: 0
            margin-bottom 15px

            span
              display inline-block
              margin-right: 5px

            .now
              font-size $font-size-large

            .old
              font-size: $font-size-small
              color $color-text-x

            .discount
              font-size: $font-size-medium
              background-color: $color-tint
              color $color-background
              border-radius 8px
              padding 2px 4px
              position: relative;
              top -4px

          .columns
            display flex
            justify-content space-between
            align-items center
            font-size: $font-size-small
            color $color-text-m
            padding-bottom: 10px
            border-bottom: 1px solid rgba(0, 0, 0, .2)

          .services
            display flex
            justify-content space-between
            align-items center
            margin-top: 20px

            .services-item
              font-size: 0
              color $color-text-m

              span
                display inline-block

              .services-icon
                img
                  width: 10px
                  height 10px

              .services-name
                font-size: $font-size-small-s

        .shop-info
          padding 10px
          box-shadow 0 5px 0 rgba(0,0,0,.1)

          .shopTitle
            height 45px
            font-size: 0
            display flex
            margin-bottom: 30px

            .logo
              flex 0 0 45px
              width: 45px
              height: 45px

              img
                width: 45px
                height: 45px

            .shopName
              flex 1
              margin-left: 20px
              font-size: $font-size-large
              line-height 45px

          .shop-middle
            display flex
            margin-bottom: 30px;
            .shop-m-left
              flex 1
              display flex
              border-right: 1px solid rgba(0, 0, 0, .1)
              box-sizing border-box

              .shop-sell
                flex 1
                display flex
                flex-direction column
                justify-content space-around
                align-items center
                color $color-text

                .s-sells
                  margin-bottom: 0px

                .s-sell-text
                  font-size $font-size-small

            .shop-m-right
              flex 1
              display-center()
              font-size: 0
              table
                tr
                  display block
                  color $color-text-x
                  font-size: 0
                  margin-bottom 5px
                  td
                    font-size: $font-size-medium
                    margin-right 10px
                    display inline-block
                  .high
                    background-color: red
                    color $color-background
                  .low
                    background-color: green
                    color $color-background
          .shop-bottom
            margin-bottom 20px
            display-center()
            .btn
              text-align center
              line-height 30px
              width: 150px
              height 30px
              border-radius 6px
              background-color: rgba(0,0,0,.1)

        .desc-title
          margin 10px 0 0 0
          padding 20px
          font-size $font-size-medium-x
          color $color-text-m
        .desc-key
          padding: 5px 20px 20px 20px
          margin-bottom 10px
        .desc-list
          .list
            width: 100%
            img
              width: 100%
</style>