import * as types from './mutation-type'

const mutations = {
  [types.ADD_TO_CART](state, info) {
    const oldInfo = state.cartList.find(item => {
      return item.id === info.id
    })
    if (oldInfo) {
      oldInfo.count += 1
    } else {
      info.count = 1
      info.checked = true
      state.cartList.push(info)
    }
    let flag = true
    state.cartList.filter(item => {
      if(!item.checked){
        return flag = false
      }
    })
    state.allSelected = flag
  },
  [types.DECREMENT_TO_CART](state, info) {
    let newInfo
    let index = state.cartList.findIndex(item => {
      if (item.id === info.id) {
        newInfo = item
        return
      }
    })
    if (newInfo.count === 1) {
      return
    }
    newInfo.count -= 1
    state.cartList[index] = newInfo
  },
  [types.CHANGE_CHECKED](state, info) {
    // 修改info里面的 checked 是否为选中
    let flag = true
    state.cartList.findIndex((item, i) => {
      if (item.id === info.id) {
        state.cartList[i] = info
      }
      if (!item.checked) {
        state.allSelected = false
        flag = false
      }
    })
    if (flag) {
      state.allSelected = true
    }
  },
  [types.TOTAL_PRICE](state) {
    let total_price = 0
    state.cartList.filter(item => {
      for (let i = 0; i < parseInt(item.count); i++) {
        if (item.checked) {
          total_price += parseInt(item.price)
        }
      }
    })
    state.totalPrice = total_price
  },
  [types.ALL_SELECTED](state, flag) {
    if(state.cartList.length === 0){
      return
    }
    state.allSelected = flag
    state.cartList.filter(item => {
      for (let i = 0; i < item.count; i++) {
        item.checked = flag
      }
    })
  },
  [types.DELETE_SELECT](state){
    let newCartList = []
    state.cartList.map(item => {
      if(item.checked){
        return
      }
      newCartList.push(item)
    })
    // 修改 cartList
    state.cartList = newCartList
    // 修改 allSelected
    state.allSelected = false
    // 修改合计 0， 因为没有选中的状态
    state.totalPrice = 0
  }
}


export default mutations
