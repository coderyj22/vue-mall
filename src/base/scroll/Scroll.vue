<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      data: {
        type: Array,
        default() {
          return []
        }
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      },
      probeType: {
        type: Number,
        default: 0
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, 20)
      }
    },
    data(){
      return {
        scroll:null
      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {
        if(!this.$refs.wrapper){
          console.log('scroll 未被创建');
          return
        }

        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true,
          pullUpLoad: this.pullUpLoad,
          probeType: this.probeType
        })

        if (this.pullUpLoad) {
          this.scroll.on('pullingUp', () => {
            this.$emit('loadData')
          })
        }

        if (this.probeType) {
          this.scroll.on('scroll', (p) => {
            this.$emit('scroll', p.y)
          })
        }
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      scrollTo(y = 0, delay = 400) {
        this.scroll && this.scroll.scrollTo(0, y, delay)
      }
    }
  }
</script>

<style scoped>

</style>
