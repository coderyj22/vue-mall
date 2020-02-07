const CART_LIST_KEY = '__cartList__'


export function saveLocalStorage(info) {
  let cartList = localStorage.getItem(CART_LIST_KEY) || []
  if (cartList) {   // localStroage 中有存储
    if (queryHaveInfo(cartList, info)) {
      let newCartList = addCountInfo(cartList, info)
    } else {
      cartList.push(info)
    }
  } else {
    cartList.push(info)
  }
  localStorage.setItem(CART_LIST_KEY, cartList)
}

function queryHaveInfo(cartList, info) {
  cartList.find(item => {
    return item.id === info.id
  })
}

function addCountInfo(cartList, info) {
  let newCartList = cartList.map(item => {
    if (item.id === info.id) {
      item.count++
    }
    return item
  })
  return newCartList
}
