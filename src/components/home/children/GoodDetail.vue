<template>
  <div class="good-detail">
    good-detail
  </div>
</template>

<script>
  import {getDetail} from 'network/home'
  export default {
    name: "GoodDetail",
    props:{
      id:{
        type:String,
        default:''
      }
    },
    created(){
      this._getDetail()
    },
    methods:{
      _getDetail(){
        // getDetail(this.id).then(res=>{
        //   console.log(res);
        // })
        console.log('detail 里面：  '+this.id);
      }
    }
  }
</script>

<style scoped>

</style>