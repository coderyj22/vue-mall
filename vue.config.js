module.exports = {
  configureWebpack:{
    resolve:{
      alias:{
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'base':'@/base'
      }
    }
  },
  devServer:{
    hot:false,
    port: 8083,
    open:true
  }
}