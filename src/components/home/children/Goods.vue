<template>
  <div class="goods" v-if="data.length">
    <goods-item v-for="(item,index) in data"
                :key="index"
                :goods-info="item"
                @detailInfo="detailInfo"
    />
  </div>
</template>

<script>
  import GoodsItem from "./GoodsItem";
  export default {
    name: "Goods",
    components:{
      GoodsItem
    },
    props:{
      data:{
        type:Array,
        default(){
          return []
        }
      }
    },
    methods:{
      detailInfo(id){
        this.$emit("detailInfo",id)
      }
    }
  }
</script>

<style scoped lang="stylus">
.goods
  display flex
  justify-content space-around
  flex-wrap wrap
  font-size:0
  padding 5px
</style>
