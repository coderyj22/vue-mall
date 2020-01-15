export class GoodInfo {
  constructor(columns, itemInfo, shopInfo,detailInfo) {
    this.columns = columns
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.discountDesc = itemInfo.discountDesc
    this.nowPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.realPrice = itemInfo.lowNowPrice
    this.shopName = shopInfo.name
    this.services = shopInfo.services
    this.shopLogo = shopInfo.shopLogo
    this.shopUrl = shopInfo.shopUrl
    this.cSells = shopInfo.cSells
    this.cGoods = shopInfo.cGoods
    this.score = shopInfo.score
    this.list = detailInfo.detailImage[0].list
  }
}

