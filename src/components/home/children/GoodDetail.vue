<template>
  <transition name="slide" class="slide">
    <div class="good-detail">
      <nav-bar ref="navBar" class="nav-bar">
        <div slot="left" @click="backClick">
          <i class="icon icon-back"/>
        </div>
        <div slot="center" class="center">
          <div class="item"
               v-for="(item,index) in tabBar"
               @click="tabBarClick(index)"
               :class="{active:currentIndex===index}">{{item}}
          </div>
        </div>
      </nav-bar>
      <scroll class="content" v-if="dataInfo" ref="scroll" :probeType="probeType" @scroll="scroll">
        <div class="wrapper">
          <div class="slider-wrapper">
            <slider class="slider" :loop="true" :autoPlay="true" v-if="topImages.length" :data="topImages">
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
                      {{item.score | formatScore}}
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
          <!-- 参数 -->
          <div ref="paramInfo" class="param-info" v-if="isRenderParamsInfo">
            <table class="info-rule">
              <tr v-for="item in paramsInfo.rule.tables[0]">
                <td v-for="i in item">
                  {{i}}
                </td>
              </tr>
            </table>
            <table class="info-size">
              <tr v-for="item in paramsInfo.info.set">
                <td class="key">{{item.key}}</td>
                <td class="value">{{item.value}}</td>
              </tr>
            </table>
          </div>
          <!-- 用户评论 -->
          <div ref="commentInfo" class="comment-info" v-if="rate">
            <div class="info-header">
              <div class="header-title">用户评价</div>
              <div class="header-more">更多 ></div>
            </div>
            <div class="info-user">
              <img :src="rate.avatar" alt="">
              <span class="uname">{{rate.uname}}</span>
            </div>
            <div class="info-detail">
              <p class="rate-content">{{rate.content}}</p>
              <div class="detail_">
                <div class="detail-time">{{rate.created | formatTime}}</div>
                <div class="detail-style">{{rate.style}}</div>
              </div>
            </div>
          </div>
          <!-- 热门推荐 -->
          <div ref="recommendInfo" class="recommend-hot">
            <div class="hot-header">热门推荐</div>
            <div class="hot-view">
              <hot-recommend :goods="hotRecommend" v-if="hotRecommend.length"/>
            </div>
          </div>
        </div>
      </scroll>
      <bottom-bar @addCart="addCart"/>
      <back-top v-show="showTop" @backTopClick="backTopClick"/>
      <show-toast v-show="showToast" text="添加购物车成功"/>
    </div>
  </transition>
</template>

<script>
import NavBar from "base/navbar/NavBar";
import Slider from "base/slider/Slider";
import Scroll from "base/scroll/Scroll";
import HotRecommend from "./HotRecommend";
import BottomBar from "./BottomBar";
import BackTop from "base/backtop/BackTop";
import ShowToast from "base/showtoast/ShowToast";
import {getDetail, getRecommend} from "network/home";
import {GoodInfo, RateInfo, ShopInfo} from "common/js/myClass";
import {debounce} from "common/js/util";

import {mapMutations} from 'vuex'
import {ADD_TO_CART} from "../../../store/mutation-type";

export default {
  name: "GoodDetail",
  components: {
    NavBar,
    Slider,
    Scroll,
    HotRecommend,
    BottomBar,
    BackTop,
    ShowToast
  },
  data() {
    return {
      id: null,
      tabBar: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0,
      topImages: [],         // 轮播图数据
      dataInfo: {},
      paramsInfo: {},
      isRenderParamsInfo: false,
      rate: null,
      hotRecommend: [],
      themeTops: [],
      probeType: 3,
      showTop: false,
      showToast: false
    }
  },
  created() {
    this.id = this.$router.history.current.params.id
    this._getDetail()
    this._getRecommend()
  },
  mounted() {
  },
  updated() {
    setTimeout(() => {
      this._calcOffsetTop()
    }, 200)
  },
  filters: {
    formatScore(num) {
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
    },
    formatTime(time) {
      const data = new Date(time * 1000)
      const year = data.getFullYear() + ''
      const month = data.getMonth() + 1
      const day = data.getDate()
      const hour = data.getHours()
      const minute = data.getMinutes()
      const second = data.getSeconds()
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`
    }
  },
  methods: {
    _getDetail() {
      getDetail(this.id).then(res => {
        this.topImages = res.data.result.itemInfo.topImages
        this.dataInfo = this._normalizeData(res.data.result)
        this.paramsInfo = res.data.result.itemParams
        this.isRenderParamsInfo = true
        if (res.data.result.rate.cRate) {
          console.log(res.data.result.rate);
          this.rate = new RateInfo(res.data.result.rate.list[0])
          // console.log(this.rate);
        } else {
          this.rate = false
        }

      })
    },
    _getRecommend() {
      getRecommend().then(res => {
        // console.log(res.data.data.list);
        this.hotRecommend = res.data.data.list
      })
    },
    tabBarClick(i) {
      this.currentIndex = i
      this.$refs.scroll.scroll.scrollTo(0, -this.themeTops[i], 0)
    },
    backClick() {
      this.$router.back()
    },
    imgLoad() {
      try {
        debounce(this.$refs.scroll.refresh(), 100)
      } catch (err) {
        console.log(err);
      }
    },
    _normalizeData(data) {
      let ret = []
      ret.push(new GoodInfo(data.columns, data.itemInfo, data.shopInfo, data.detailInfo))
      return ret[0]
    },
    _calcOffsetTop() {
      this.themeTops = []
      if (this.$refs.paramInfo && this.$refs.paramInfo.offsetTop) {
        this.themeTops.push(this.$refs.navBar.$el.offsetTop)
        this.themeTops.push(this.$refs.paramInfo.offsetTop)
        if (this.rate) {
          this.themeTops.push(this.$refs.commentInfo.offsetTop)
        } else {
          this.themeTops.push(this.$refs.paramInfo.offsetTop)
        }
        this.themeTops.push(this.$refs.recommendInfo.offsetTop)
      } else {
        console.log('数据请求太快,还未渲染到页面上');
      }

    },
    backTopClick() {
      console.log(1);
      this.$refs.scroll.scrollTo(0, 0, 0)
    },
    scroll(p) {
      const y = -p
      if (y > 2000) {
        this.showTop = true
      } else {
        this.showTop = false
      }
      for (let i = 0; i < this.themeTops.length; i++) {
        if (this.themeTops[i + 1] && y > this.themeTops[i] && y < this.themeTops[i + 1]) {
          this.currentIndex = i
        } else {
          if (y < 0) {
            this.currentIndex = 0
          }
          if (y > this.themeTops[this.themeTops.length - 1]) {
            this.currentIndex = this.themeTops.length - 1
          }
        }
      }
    },
    addCart() {
      const obj = new ShopInfo(this.id, this.dataInfo, this.topImages[0])
      console.log(obj);
      this.add_to_cart(obj)
      this.calcTotalPrice()
      this.showToast = true
      setTimeout(() => {
        this.showToast = false
      },1000)
    },
    ...mapMutations({
      add_to_cart: 'ADD_TO_CART',
      calcTotalPrice: 'TOTAL_PRICE'

    })
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
      box-shadow 0 2px 2px 0px rgba(0, 0, 0, .1)

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
      bottom: 44px
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

          .slider
            height: 100%;

            a
              height: 100%

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
          box-shadow 0 5px 0 rgba(0, 0, 0, .1)

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
              background-color: rgba(0, 0, 0, .1)

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

        .param-info
          margin-top 10px
          box-shadow 0 -2px 0px 2px rgba(0, 0, 0, .1);
          padding 20px 15px 10px 15px
          font-size: $font-size-medium
          border-bottom: 5px solid #f2f5f8

          .info-rule
            width: 100%
            border-bottom 1px solid rgba(0, 0, 0, .1)

            tr
              height: 42px
              display flex
              border-bottom 1px solid rgba(0, 0, 0, .1);

              td
                flex 1
                line-height 42px

          .info-size
            width 100%

            tr
              height 42px
              display flex
              line-height 42px
              border-bottom 1px solid rgba(0, 0, 0, .1);

              .key
                flex 0 0 90px

              .value
                flex 1
                max-width 250px
                color #eb4868
                text-overflow ellipsis
                overflow hidden
                white-space nowrap


        .comment-info
          padding 7px 15px 10px 15px
          border-bottom 5px solid #f2f5f8

          .info-header
            display flex
            justify-content space-between
            color $color-text
            height 50px
            align-items center
            border-bottom: 1px solid rgba(0, 0, 0, .1)

            .header-title
              font-size: $font-size-large

            .header-more
              font-size: $font-size-medium

          .info-user
            display flex
            align-items center
            margin 10px 0

            img
              width 42px
              height 42px
              border-radius 50%

            .uname
              margin-left 15px
              font-size: $font-size-medium
              color $color-theme-x

          .info-detail
            color $color-text-x
            margin-bottom 10px

            .rate-content
              font-size: $font-size-medium
              letter-spacing 1px
              color $color-text-m

            .detail_
              display flex
              margin-top 13px
              font-size: $font-size-small
              color $color-text-x

              .detail-time
                margin-right: 10px


        .recommend-hot
          padding: 5px 10px

          .hot-header
            line-height 40px
            color $color-text
            height 40px
            padding-left: 5px

          .hot-view
            margin-top: 5px

</style>
