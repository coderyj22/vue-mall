<template>
  <div class="home">
    <nav-bar class="nav-bar">
      <h1 slot="center" class="title">YJ 购物街</h1>
    </nav-bar>
    <scroll class="content">
      <div>
        <div class="slider-wrapper">
          <slider :loop="true" :autoPlay="true" v-if="banner.length">
            <a href="" v-for="item in banner">
              <img :src="item.image" alt="">
            </a>
          </slider>
        </div>
        <recommend v-if="recommend.length" :data="recommend"></recommend>
        <div class="feature">
          <img src="~common/img/recommend_bg.jpg" alt="">
        </div>
        <tab-control :data="['流行','新款','精选']"></tab-control>

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
          <li>11</li>
          <li>12</li>
          <li>13</li>
          <li>14</li>
          <li>15</li>
          <li>16</li>
          <li>17</li>
          <li>18</li>
          <li>19</li>
          <li>20</li>
          <li>21</li>
          <li>22</li>
          <li>23</li>
          <li>24</li>
          <li>25</li>
          <li>26</li>
          <li>27</li>
          <li>28</li>
          <li>29</li>
          <li>30</li>
        </ul>
      </div>
    </scroll>
  </div>
</template>

<script>
  import NavBar from "base/navbar/NavBar";
  import Slider from "base/slider/Slider";
  import Recommend from "./children/Recommend";
  import Scroll from "base/scroll/Scroll";
  import TabControl from "./children/TabControl";
  import {getHome} from "network/home";
  import {ERR_OK} from "network/config";

  export default {
    name: "Home",
    components: {
      NavBar,
      Slider,
      Recommend,
      Scroll,
      TabControl
    },
    created() {
      this._getHome()
    },
    data() {
      return {
        banner: [],
        recommend: []
      }
    },
    methods: {
      _getHome() {
        getHome().then(res => {
          if (res.statusText === ERR_OK) {
            this.banner = res.data.data.banner.list
            this.recommend = res.data.data.recommend.list
            console.log(res.data.data);
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


</style>