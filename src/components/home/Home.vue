<template>
  <div class="home">
    <div>
      <nav-bar class="nav-bar">
        <h1 slot="center" class="title">YJ 购物街</h1>
      </nav-bar>
      <div class="slider-wrapper">
        <slider :loop="true" :autoPlay="true"  v-if="banner.length">
          <a href="" v-for="item in banner">
            <img :src="item.image" alt="">
          </a>
        </slider>
      </div>
      <!-- 推荐 recommend -->

    </div>
  </div>
</template>

<script>
  import NavBar from "base/navbar/NavBar";
  import Slider from "base/slider/Slider";
  import {getHome} from "network/home";
  import {ERR_OK} from "network/config";

  export default {
    name: "Home",
    components: {
      NavBar,
      Slider,
    },
    created() {
      this._getHome()
    },
    data(){
      return {
        banner:[],
        recommend:[]
      }
    },
    methods:{
      _getHome(){
        getHome().then(res => {
          if(res.statusText === ERR_OK){
            this.banner = res.data.data.banner.list
            this.recommend = res.data.data.recommend
            console.log(this.recommend);
          }
        })
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


    .slider-wrapper
      position: relative;
      width: 100%
      top 44px
      overflow hidden



</style>