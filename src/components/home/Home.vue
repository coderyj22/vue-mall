<template>
  <div class="home">
    <nav-bar class="nav-bar">
      <h1 slot="center" class="title">YJ 购物街</h1>
    </nav-bar>
    <scroll ref="scroll"
            class="content"
            :probeType="probeType"
            :pullUpLoad="pullUpLoad"
            @loadData="loadData"
            @scroll="printY">
      <div>
        <div class="slider-wrapper">
          <slider :loop="true" :autoPlay="true" v-if="banner.length">
            <a href="" v-for="item in banner">
              <img :src="item.image" alt="">
            </a>
          </slider>
        </div>
        <recommend v-if="recommend.length" :data="recommend"/>
        <div class="feature">
          <img src="~common/img/recommend_bg.jpg" alt="">
        </div>
        <tab-control :currentIndex="currentIndex"
                     ref="tab"
                     class="tab"
                     v-show="!showTab"
                     :data="['流行','新款','精选']"
                     @itemClick="getIndex"/>
        <goods @detailInfo="detailInfo" ref="goods" v-if="showGoods" :data="goods[currentType].list"/>
        <loading v-if="showLoading" class="loading"/>
      </div>
    </scroll>
    <router-view></router-view>
    <tab-control :currentIndex="currentIndex"
                 v-show="showTab"
                 :data="['流行','新款','精选']"
                 @itemClick="getIndex"/>
    <back-top v-if="showTop" @backTopClick="backTopClick"/>
  </div>
</template>

<script>
  import NavBar from "base/navbar/NavBar";
  import Slider from "base/slider/Slider";
  import Recommend from "./children/Recommend";
  import Scroll from "base/scroll/Scroll";
  import TabControl from "./children/TabControl";
  import Goods from "./children/Goods";
  import Loading from 'base/loading/Loading'
  import BackTop from 'base/backtop/BackTop'
  import {debounce} from "common/js/util";
  import {getHome, getGoods} from "network/home";
  import {ERR_OK} from "network/config";

  export default {
    name: "Home",
    components: {
      NavBar,
      Slider,
      Recommend,
      Scroll,
      TabControl,
      Goods,
      Loading,
      BackTop
    },
    created() {
      this._getHome()
      this._getGoods('pop', true)
      this._getGoods('new', true)
      this._getGoods('sell', true)
      this.showGoods = true

    },
    mounted() {
      // 监听 goods-item里面图片的加载
      this.bus.$on('imgLoad', debounce(() => {
        this.$refs.scroll.refresh()
      }))
    },
    data() {
      return {
        banner: [],
        pullUpLoad: true,     // 开启上啦加载更多
        showLoading: false,
        probeType: 3,          // 开启实时监听scrollY
        recommend: [],         // 轮播图
        showTop: false,        // 显示backTop
        showTab: false,         // 显示 固定导航
        tabControlOffsetTop: 0,
        currentIndex: 0,
        scrollY: 0,
        tabFirst: true,       // 第一次进入的时候保存 tabControlOffsetTop 的值 , 之后不允许修改
        goods: {
          'pop': {
            page: 0,
            list: []
          },
          'new': {
            page: 0,
            list: []
          },
          'sell': {
            page: 0,
            list: []
          },
        },
        currentType: 'pop',
        showGoods: false
      }
    },
    watch: {
      scrollY() {
        if(this.tabFirst){
          if (this.scrollY) {
            this.tabControlOffsetTop = this.$refs.tab.$el.offsetTop
            this.tabFirst = false   // 为false 之后不允许修改tabControlOffsetTop的值
          }
        }
        this.showTop = this.scrollY >= 2000 ? true : false
        this.showTab = this.scrollY >= this.tabControlOffsetTop ? true : false
        if (this.showTab) {
          this.$refs.goods.$el.style.marginTop = '56px'
          return
        }
        this.$refs.goods.$el.style.marginTop = '0px'
      }
    },
    methods: {
      _getHome() {
        getHome().then(res => {
          if (res.statusText === ERR_OK) {
            this.banner = res.data.data.banner.list
            this.recommend = res.data.data.recommend.list
          }
        })
      },
      _getGoods(type, isFirst = false) {
        let currentPage = this.goods[type].page + 1
        getGoods(type, currentPage).then(res => {
          this.goods[type].list = this.goods[type].list.concat(res.data.data.list)
          this.goods[type].page = currentPage
          this.$refs.scroll.refresh()
          if (!isFirst) {
            this.$refs.scroll.finishPullUp()
            this.showLoading = false
            this.$refs.scroll.refresh()
          }
        })
      },
      detailInfo(id){
        this.$router.push({
          path:`/home/${id}`
        })
      },
      getIndex(i) {
        this.currentType = i === 0 ? 'pop' : i === 1 ? 'new' : 'sell'
        this.currentIndex = i
      },
      loadData() {
        this._getGoods(this.currentType)
        this.showLoading = true
      },
      printY(p) {
        this.scrollY = -p
      },
      backTopClick() {
        this.$refs.scroll.scrollTo(0, 400)
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  .home
    .nav-bar
      background-color: $color-tint

      .title
        line-height 44px
        font-size: $font-size-large
        margin: 0
        padding: 0
        text-align center
        color $color-background

    .content
      width: 100%
      position fixed
      bottom: 50px
      top: 44px

      .slider-wrapper
        position: relative;
        width: 100%
        overflow hidden
        z-index 9


      .feature
        margin-bottom 10px

        img
          width: 100%

      .loading
        position relative
        width: 100%
        z-index 1000

</style>
