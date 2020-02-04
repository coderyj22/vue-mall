<template>
  <div class="hot-recommend">
    <goods-item v-for="(item,index) in goods"
                :key="index"
                :goodsInfo="item"
                :img-style="true"
                @detailInfo="detailInfo"
    />
  </div>
</template>

<script>
import GoodsItem from "./GoodsItem";
export default {
  name: "HotRecommend",
  components:{
    GoodsItem
  },
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    detailInfo(id){
      console.log(id);
    }
  }
}
</script>

<style scoped lang="stylus">
.hot-recommend
  display flex
  justify-content space-around
  flex-wrap wrap
  font-size:0
</style>
