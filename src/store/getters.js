export const cartList = state => state.cartList

export const cartCount = (state, getters) => getters.cartList.length

export const totalPrice = state => state.totalPrice

export const allSelected = state => state.allSelected
