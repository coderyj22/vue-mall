<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span @click="dotClick(index)" :class="{active:currentIndex===index}" class="dot"
            v-for="(item,index) in length"/>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {addClass} from 'common/js/dom'

export default {
  name: 'Slider',
  props: {
    loop: {
      type: Boolean,
      default: false
    },
    interval: {
      type: Number,
      default: 4000
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  watch: {
    data() {
      if (this.slider) {
        console.log('data改变refresh');
        this._setSliderWidth()
        this.slider.refresh()
      }
    }
  },
  data() {
    return {
      length: 0,
      currentIndex: 0,
      timer: null
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth()
      this._initDots()
      this._initScroll()

      if (this.autoPlay) {
        this._play()
      }
    }, 40)


    window.addEventListener('resize', () => {
      // this._setSliderWidth()
      console.log(1);
      if (!this.slider || !this.slider.enable) {
        return
      }
      this._setSliderWidth(true)
      this.refresh()
    })
  },
  // activated() {
  //   this.slider.enable()
  //   let pageIndex = this.slider.getCurrentPage().pageX
  //   this.slider.goToPage(pageIndex, 0, 0)
  //   this.currentIndex = pageIndex
  //   if (this.autoPlay) {
  //     this._play()
  //   }
  // },
  //
  // deactivated() {
  //   this.slider.disable()
  //   clearTimeout(this.timer)
  // },
  methods: {
    _initScroll() {
      this.slider = new BScroll(this.$refs.slider, {
        click: true,
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          speed: 400,
          loop: this.loop
        }
      })
      if (this.autoPlay) {
        this.slider.on('scrollEnd', () => {
          this.currentIndex = this.slider.getCurrentPage().pageX
          clearTimeout(this.timer)
          this._play()
        })
      }
    },
    _setSliderWidth(resize) {
      if (!this.$refs.sliderGroup.children.length) {
        console.log('无length');
        return
      }
      this.children = this.$refs.sliderGroup.children
      let sliderWidth = 0
      let clientWidth = this.$refs.slider.clientWidth
      if (this.$refs.sliderGroup.children.length === 1) {
        sliderWidth = clientWidth
      } else {
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')
          // child.className = 'slider-item'
          child.style.width = clientWidth + 'px'
          sliderWidth += clientWidth
        }
        if (this.loop && !resize) {
          sliderWidth += 2 * clientWidth
        }
      }
      this.$refs.sliderGroup.style.width = sliderWidth + 'px'

    },
    _initDots() {
      this.length = this.children.length
    },
    _play() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.slider.next()
      }, this.interval)
    },
    dotClick(i) {
      clearTimeout(this.timer)
      this.currentIndex = i
      this.slider.goToPage(i)
    },
    refresh() {
      this.slider.refresh()
    }
  }
}
</script>

<style scoped lang="stylus">
  .slider
    overflow hidden

    .slider-group
      position: relative;
      overflow hidden
      height:100%

      .slider-item
        float left

      a
        display block
        text-decoration none

        img
          display block
          width: 100%

    .dots
      position absolute
      bottom: 10px
      width: 100%
      height 8px
      font-size: 0
      text-align center

      .dot
        width: 8px
        height: 8px
        background-color: hsla(0, 0%, 100%, .5)
        display inline-block
        margin: 0 4px
        border-radius 50%

        &.active
          width 20px
          border-radius 5px
          background-color: hsla(0, 0%, 100%, .7)


</style>
