<template>
  <div class="goods" v-if="data.length">
    <goods-item v-for="item in data" :goods-info="item"></goods-item>
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

    }
  }
</script>

<style scoped lang="stylus">
.goods
  display flex
  justify-content space-around
  flex-wrap wrap
  font-size:0
</style>