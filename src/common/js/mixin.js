import BackTop from "base/backtop/BackTop";
export const mixinBackTop = {
  components:{
    BackTop
  },
  data(){
    return {
      showTop:false
    }
  },
  methods:{
    backTopClick(){
      this.$refs.scroll.scrollTo(0,0,300)
    }
  }

}
